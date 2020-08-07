import React, {useState, useRef, useEffect, useMemo} from "react";
import "./style.css";

export default function ColumnSplitPane(props) {
  const { children, style, splitWidth} = props;
  const [leftWidth, setLeftWidth] = useState(splitWidth);
  const [mouseX, setMouseX] = useState(null);
  const [dragging, setDragging] = useState(false);
  const leftPaneRef = useRef(null);
  const separatorRef = useRef(null);

  useEffect(() => {
    if(splitWidth !== null && splitWidth !== undefined) {
      setLeftWidth(splitWidth);
    }
  }, [splitWidth]);


  const onMouseDown = event => {
    setLeftWidth(leftPaneRef.current.getBoundingClientRect().width);
    setMouseX(event.clientX);
    setDragging(true);
    event.stopPropagation();
    event.preventDefault();
  };

  const onMouseMove = event => {
    const deltaXPos = event.clientX - mouseX;
    const newLeftWidth = leftWidth + deltaXPos;
    setLeftWidth(newLeftWidth);
    setMouseX(event.clientX);
    event.stopPropagation();
    event.preventDefault();
  };

  const onMouseUp = (event) => {
    setDragging(false);
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    if(dragging){
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);


  let styleObj;
  const leftChildStyle = {};
  if(children[0] !== null && children[1] !== null) {
    styleObj = Object.assign({}, style,{
      cursor: "col-resize"
    });
    if(leftWidth !== null){
      leftChildStyle["width"] = leftWidth
    }
  }


  let rightChildStyle = {
    flex: '1 1 0%'
  };

  if(children[1] == null){
    leftChildStyle['flex'] = 1;
    rightChildStyle = null;
  }



  return (
    <div className="split-pane-column" >
      <div ref={leftPaneRef} className="split-pane-left" style={leftChildStyle}>
        {children[0]}
      </div>
      {styleObj ? <span ref={separatorRef} className="split-pane-separator-column" style={styleObj} onMouseDown={onMouseDown}/> : null }
      <div className="split-pane-right" style={rightChildStyle}>
        {children[1]}
      </div>
    </div>
  );
}

