// "use client";
// import styled from "@emotion/styled";

// interface ButtonProps {
//   color: "transparent" | "light-yellow" | "yellow";
// }

// const commonStyles = `
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-family: var(--font-family);
//   font-weight: 400;
//   color: var(--label);
//   border: 1px solid transparent;
//   transition: border-color 0.25s, box-shadow 0.25s;
// `;

// const buttonVariants = {
//   transparent: `
//     ${commonStyles};
//     background: transparent;
//   `,
//   "light-yellow": `
//     ${commonStyles};
//     background: var(--not-active);
//   `,
//   yellow: `
//     ${commonStyles};
//     background: var(--button);
//   `,
// };

// export const StyledButton = styled.button<ButtonProps>`
//   ${({ color }) => buttonVariants[color]};

//   &:hover,
//   &:focus {
//     border-color: var(--input-text);
//     box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
//   }

//   &:active {
//     border: 1px solid var(--label);
//     box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
//   }
// `;
