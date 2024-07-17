import { Comment } from "@/types";

export const commentMapper = (comment: any): Comment => {
    return {
        comment: comment.comment,
        user_name: comment.user_name,
        user_avatar: comment.user_avatar,
        user_id: comment.user_id,
    }
};    
    
