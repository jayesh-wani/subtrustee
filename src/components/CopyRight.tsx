interface CopyRightProps {
  textAlign?: string;
}

function CopyRight({ textAlign }: CopyRightProps) {
  return (
    <div
      className={
        "text-[#717171] text-[10px]  " + (textAlign ? textAlign : "text-right")
      }
    >
      Copyright © 2023 THRIVEDGE EDUTECH PVT LTD. All rights reserved.
    </div>
  );
}

export default CopyRight;
