"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Copy, Container } from "lucide-react";
import { Button } from "@/components/ui/button";

function CodeBlock({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-muted p-3 font-code text-sm">
      <Terminal className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-muted-foreground">{command}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0"
        onClick={() => navigator.clipboard.writeText(command)}
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy command</span>
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <Card className="w-full border-2 shadow-lg">
          <CardHeader className="text-center p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Container className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl md:text-4xl">
              Dockerized Node Starter
            </CardTitle>
            <CardDescription className="pt-2 text-base">
              A Next.js starter kit with API routes, testing, and Docker support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8 pt-0">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Test API Endpoints</h3>
              <p className="text-muted-foreground">
                Use the following commands to test the included API routes. Make sure the development server is running.
              </p>
              <div className="space-y-2">
                <CodeBlock command="curl http://localhost:9002/api" />
                <CodeBlock command="curl http://localhost:9002/api/health" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get Started</h3>
              <p className="text-muted-foreground">
                Follow the instructions in the `README.md` file to run this application locally, run tests, and deploy it using Docker.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/firebase/studio-seed-docker-next#readme" target="_blank" rel="noopener noreferrer">
                  <Button>Read Documentation</Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, Docker, and Tailwind CSS.</p>
        </footer>
      </div>
    </main>
  );
}
