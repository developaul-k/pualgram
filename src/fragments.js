export const COMMENT_FRAGRMENT = `
    fragment CommentParts on Comment {
        id
        text
        user {
            username
        }
    }
`;