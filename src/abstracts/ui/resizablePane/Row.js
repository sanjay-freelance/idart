import React, {useState, useRef, useEffect, useMemo} from "react";
import "./style.css";

export default function RowSplitPane(props) {
  const {children, style, splitHeight} = props;

  const [topHeight, setTopHeight] = useState(splitHeight);
  const [mouseY, setMouseY] = useState(null);
  const [dragging, setDragging] = useState(false);
  const topPaneRef = useRef(null);
  const separatorRef = useRef(null);

  useEffect(() => {
    if(splitHeight !== null && splitHeight !== undefined) {
      setTopHeight(splitHeight);
    }
  }, [splitHeight]);

  const onMouseDown = event => {
    setTopHeight( topPaneRef.current.getBoundingClientRect().height);
    setMouseY(event.clientY);
    setDragging(true);
    event.stopPropagation();
    event.preventDefault();
  };

  const onMouseMove = event => {
    const deltaYPos = event.clientY - mouseY;
    const newTopHeight = topHeight + deltaYPos;
    setTopHeight(newTopHeight);
    setMouseY(event.clientY);
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
  const topChildStyle = {};
  if(children[0] !== null && children[1] !== null) {
    styleObj = Object.assign({},style,{
      cursor: "row-resize"
    });
    if(topHeight !== null){
      topChildStyle["height"] = topHeight;
    }
  }


  let bottomChildStyle = {
    flex: '1 1 0%'
  };


  if(children[1] == null){
    topChildStyle['flex'] = 1;
    bottomChildStyle = null;
  }

  return (
  <div className="split-pane-row" >
    <div ref={topPaneRef} className="split-pane-top" style={topChildStyle}>
      {children[0]}
    </div>
    {styleObj ? <span ref={separatorRef} className="split-pane-separator-row" style={styleObj} onMouseDown={onMouseDown}/> : null}
    <div className="split-pane-bottom" style={bottomChildStyle}>
      {children[1]}
    </div>
  </div>
  );


}
