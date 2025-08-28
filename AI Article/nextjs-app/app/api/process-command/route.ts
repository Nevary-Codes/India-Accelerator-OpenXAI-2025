import { NextRequest } from "next/server";
import { spawn } from "child_process";

export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  if (!topic || typeof topic !== "string") {
    return new Response("Topic is required", { status: 400 });
  }

  const prompt = `Write a short, unique, well-structured article (~250 words) about: "${topic}".
  Use simple language, small paragraphs, and a one-line conclusion.`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const ollama = spawn("ollama", ["run", "llama3.2:latest"]);

        ollama.stdin.write(prompt);
        ollama.stdin.end();

        // Stream stdout chunks to client
        for await (const chunk of ollama.stdout) {
          controller.enqueue(encoder.encode(chunk.toString()));
        }

        // Capture any errors
        let err = "";
        for await (const chunk of ollama.stderr) {
          err += chunk.toString();
        }

        const exitCode = await new Promise((resolve) =>
          ollama.on("close", resolve)
        );

        if (exitCode !== 0) {
          controller.error(new Error(err || "Ollama failed"));
        } else {
          controller.close();
        }
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}