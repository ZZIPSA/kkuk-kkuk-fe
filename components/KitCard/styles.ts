export const kitCardContainerStyles = {
  default: 'border-0 shadow-none',
  vertical: 'flex flex-col h-full gap-2',
  StartPage: 'flex justify-between w-full flex-col',
  description: 'grid grid-cols-2 gap-y-6 px-4 py-6',
};
export const kitCardHeaderStyles = {
  default: 'p-0 relative w-full shrink-0',
  notStartPage: 'aspect-square',
  startPage: 'aspect-video mb-2',
  thumbnail: {
    notStartPage: 'border-black/20 border rounded-md w-full h-full object-cover aspect-square',
    startPage: 'border rounded-xl object-cover',
  },
};
export const kitCardContentStyles = {
  default: 'p-0 flex flex-col gap-2 h-full',
  startPage: 'w-full mb-6',
  title: {
    default: 'overflow-hidden whitespace-nowrap overflow-ellipsis text-base',
  },
  tags: {
    default: 'flex gap-2 overflow-x-auto w-full scrollbar-hide',
    tag: {
      default: 'break-keep',
    },
  },
  uploader: {
    default: 'p-0 flex items-center gap-2',
    vertical: 'mt-auto',
    avatar: {
      default: 'items-center border border-grey-100 w-6 h-6',
    },
    name: {
      default: 'overflow-hidden whitespace-nowrap overflow-ellipsis text-grey-200 text-xs',
    },
  },
  buttons: {
    default: 'flex justify-end gap-2 mt-auto',
    button: {
      default: 'border border-grey-200 bg-grey-50 rounded-full w-10 aspect-square',
      bookmark: 'w-6 h-6 stroke-none fill-grey-100 m-auto',
      heart: 'w-6 h-6 stroke-none fill-grey-100 m-auto',
    },
  },
  description: {
    StartPage: 'text-grey-300 bg-grey-50 px-4 py-2 rounded-xl',
  },
};
export const kitCardFooterStyles = {
  default: 'col-span-full bg-grey-50 px-4 py-2 rounded-xl',
  description: { default: 'text-grey-300' },
};
