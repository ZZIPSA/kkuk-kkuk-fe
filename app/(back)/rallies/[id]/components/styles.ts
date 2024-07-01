export const rallyInfoStyles = {
  container: 'bg-background p-6 rounded-2xl relative',
  title: 'font-bold text-xl mb-4',
  percentage: 'font-bold',
  progress: 'mb-1 h-3',
  dDay: 'absolute right-8 bottom-10 text-xs text-background py-1 text-center bg-rally-flag bg-cover h-[38px] aspect-[60/38]',
  date: 'text-xs flex justify-around',
  startDate: 'mr-auto',
};

export const rallyStampsStyles = {
  container: 'font-bold',
  title: 'pb-6',
  stamps: 'bg-rally-route bg-contain bg-center bg-no-repeat gap-y-6 gap-x-2 snake-3',
};

export const rallyFooterStyles = {
  footer: 'mt-auto flex flex-col gap-2',
  shareButton: 'w-full bg-background text-grey-400 border border-grey-100',
  shareButtonDisabled: 'opacity-0 cursor-default',
  stampButton: {
    default: 'w-full',
    primary: 'bg-primary',
    indigo: 'bg-indigo-500 hover:bg-indigo-300 group',
    grey: 'bg-grey-100',
  },
  stampIcon: {
    default: 'w-6 h-6 mr-1 fill-white',
    primary: 'stroke-primary',
    indigo: 'stroke-indigo-500 group-hover:stroke-indigo-300',
    grey: 'stroke-grey-100',
  },
};
