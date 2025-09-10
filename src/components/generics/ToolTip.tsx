function ToolTip({ children, text, width }: any) {
  return (
    <div
      className={
        "overflow-hidden w-full hover:overflow-visible  z-50 relative group " +
        (width && width ? width : "max-w-[10rem]")
      }
    >
      {children}
      <div className="z-40 bg-gray-900/80 min-w-[8rem]  top-[100%] group-hover:text-white absolute rounded-md p-2 group-hover:-top-10 left-0">
        {text}
      </div>
    </div>
  );
}

export default ToolTip;
