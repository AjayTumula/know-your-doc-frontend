import { useState } from "react";
import Button from "../common/Button";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  return (
    <div className="flex items-center p-3 border-t">
      <input
        className="flex-1 border rounded-md p-2 mr-2"
        placeholder="Ask something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={() => { onSend(text); setText(""); }}>Send</Button>
    </div>
  );
}
