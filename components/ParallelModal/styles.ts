const ParallelModalStyles = {
  container:
    'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[328px] shadow-lg bg-background text-center p-6 flex flex-col gap-6 rounded-xl z-50',
  backdrop: 'fixed top-0 bottom-0 left-0 right-0 bg-grey-400/20 backdrop-blur-sm z-50 ease-in',
  description: 'text-grey-400 text-sm',
  title: 'text-xl font-bold text-primary -mb-4',
  buttons: `flex gap-2 justify-stretch [&>*]:py-4 [&>*]:rounded-xl [&>*]:flex-1`,
  cancel: 'border text-grey-400',
  submit: 'bg-primary text-white',
};
export default ParallelModalStyles;
