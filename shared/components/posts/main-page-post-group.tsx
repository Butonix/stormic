"use client";

import { Post } from "@/payload-types";
import { PostForm } from "@/shared/components/posts/post-items/post-form";
import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  data: Post[];
  className?: string;
}

export const MainPagePostGroup: React.FC<Props> = ({ className, data }) => {
  return (
    <>
      <div className={cn("", className)}>
        <PostForm
          limit={5}
          post={data}
          // loading={loading}
        />
      </div>
    </>
  );
};
