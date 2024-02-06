import * as React from "react";
import { ReflectionProps, ReflectionState } from "./types";

import {showLight, showSun} from "./utils/showReflection";
import { createReflectingChild } from "./createReflectingItem";


class Reflection extends React.Component<ReflectionProps, ReflectionState> {
  public static defaultProps = {
    myWhite: 'transparent',
    color: 'white',
    sideColor: 'transparent', 
    angle: 70, 
    borderRadius: '0',
    sun: false,
    light: true,
    position: 'block',
    margin: 'auto',
  }

  public readonly lightRef: React.RefObject<HTMLDivElement>;
  public readonly sunRef: React.RefObject<HTMLDivElement>;

  constructor(props: ReflectionProps) {
    super(props);
    this.state = {
      isMobileView: false
    };
    
    this.lightRef = React.createRef();
    this.sunRef = React.createRef();
  }


  public checkMobileView = () => {

    if (Number(window.innerWidth) <= 1100) {
      this.setState((state) => ({...state, isMobileView: true}))
    }
    else this.setState((state) => ({...state, isMobileView: false}))
  }
  
  public componentDidMount(): void {
    window.addEventListener('mousemove', (event) => {
      if (this.props.light) showLight(event, this);
      if (this.props.sun) showSun(event, this);
    });

    window.addEventListener('resize', this.checkMobileView)
    this.checkMobileView();
  }

   

  
  render() {
    const items = React.Children.toArray(this.props.children);

    return <>
      {
        items.map((item: React.ReactElement|any) => {
          // if (i === 0)
          if (this.state.isMobileView) return item;

          return createReflectingChild(item, this);
          
        })
      }
    </>

  }
}


export default Reflection;