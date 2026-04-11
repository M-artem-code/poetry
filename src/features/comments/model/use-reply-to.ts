"use client";

import { useState, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import type { Comment } from "@/src/shared/types";

export const useReplyTo = () => {
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const handleReply = useCallback((comment: Comment) => {
    flushSync(() => {
      setReplyingTo(comment);
    });
    areaRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 400);
  }, []);

  const cancelReply = useCallback(() => {
    setReplyingTo(null);
  }, []);

  return {
    replyingTo,
    handleReply,
    cancelReply,
    textareaRef,
    areaRef,
  };
};
