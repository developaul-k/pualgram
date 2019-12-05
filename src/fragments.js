export const roomFragments = first => `
  fragment fragmentWithRooms on Room {
    id
    messages(last: ${first}) {
      id
      text
      from {
        id
        avatar
        username
      }
      to {
        id
        avatar
        username
      }
      createdAt
    }
  }
`;
