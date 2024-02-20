import * as React from "react";
import { ReflectionProps, ReflectionState } from "./types";

import {showBorder, showLight, showSun} from "./utils/showReflection";
import { createReflectingChild } from "./createReflectingItem";

const BORDER_WIDTH = 5;
const BORDER_PATH_SCALE = 2.2;
const BORDER_RADIUS_RATIO = 1;
const BORDER_SHINING_COLOR = '#c2d9ff'


class Reflection extends React.Component<ReflectionProps, ReflectionState> {
  public static defaultProps = {
    myWhite: 'transparent',
    color: 'white',
    sideColor: 'transparent', 
    angle: 70, 
    borderRadius: '0',
    borderColor: 'orange',
    borderWidth: BORDER_WIDTH,
    borderRadiusRatio: BORDER_RADIUS_RATIO,
    borderPathScale: BORDER_PATH_SCALE,
    borderShiningColor: BORDER_SHINING_COLOR,
    sun: false,
    light: true,
    position: 'block',
    margin: 'auto',
  }

  public readonly lightRef: React.RefObject<HTMLDivElement>;
  public readonly sunRef: React.RefObject<HTMLDivElement>;
  public readonly borderPathContainerRef: React.RefObject<HTMLDivElement>;
  public readonly borderPathRef: React.RefObject<SVGMPathElement>;
  public readonly borderShineRef: React.RefObject<SVGFEPointLightElement>;
  


  constructor(props: ReflectionProps) {
    super(props);
    this.state = {
      isMobileView: false,
      borderUpdate: false,
    };
    
    this.lightRef = React.createRef();
    this.sunRef = React.createRef();
    this.borderPathContainerRef = React.createRef();
    this.borderPathRef = React.createRef();
    this.borderShineRef = React.createRef();
    
  }

  
  public checkMobileView = () => {
    if (Number(window.innerWidth) <= 1100) {
      this.setState((state) => ({...state, isMobileView: true}))
    }
    else {
      this.setState((state) => ({...state, isMobileView: false}))
    }

    
  }
  
  public componentDidMount(): void {
    window.addEventListener('mousemove', (event) => {
      if (this.props.light) showLight(event, this);
      if (this.props.sun) showSun(event, this);
      if (this.props.border) showBorder(event, this);
    });

    window.addEventListener('resize', () => {
      this.checkMobileView();
    })
    
    this.checkMobileView();
  }

  public scalePath() {
    if (!this.borderPathContainerRef.current) return;

    const thick = this.props.borderWidth || BORDER_WIDTH;
    const width = this.borderPathContainerRef.current.clientWidth, 
    height = this.borderPathContainerRef.current.clientHeight;

    const ratio = this.props.borderPathScale || BORDER_PATH_SCALE;
    this.borderPathContainerRef.current.style.scale = `${1 + ratio * thick/width} ${1 + ratio * thick/height}`;

  }

  public pathShadow() {
    if (!this.borderPathRef.current || !this.borderPathContainerRef.current) return;

    this.borderPathContainerRef.current.style.borderRadius = this.props.borderRadius || 'inherit';    
    
  }

  public delay = (time: number) => new Promise(res => setTimeout(res, time))

  public async resizePathBorder() {
    await this.delay(1000);

    this.scalePath();
    this.pathShadow();

    if (!this.borderPathRef.current || !this.borderPathContainerRef.current) return;

    const width = this.borderPathContainerRef.current.clientWidth, 
    height = this.borderPathContainerRef.current.clientHeight;
      
    const thick = this.props.borderWidth || BORDER_WIDTH;
    this.borderPathRef.current.setAttribute('stroke-width', `${thick}`);

    let borderRx: number = 0;
    let borderRy: number = 0;
    
    const ratio = this.props.borderRadiusRatio || BORDER_RADIUS_RATIO;
    if (this.props.borderRadius?.includes('%')) {
      borderRx = ratio * Number(this.props.borderRadius?.replace('%', '')) * width / 100;
      borderRy = ratio * Number(this.props.borderRadius?.replace('%', '')) * height / 100;
    }
    else {
      borderRx = ratio * Number(this.props.borderRadius?.replace('px', ''));
      borderRy = ratio * Number(this.props.borderRadius?.replace('px', ''));
    }

    const Rx = Math.max(1, borderRx/2);
    const Ry = Math.max(1, borderRy/2);
    const startCurveXPoint = Math.min(width/2, borderRx), 
      startCurveYPoint = Math.min(height/2, borderRy);

    // imagine we have a rectangular: width: 400, height: 300
    // const AB = "M3,50 C3,10 10,3 50,3 L350,3";
    const deno = 2; 
    const AB = `M${thick/deno},${startCurveYPoint} C${thick/deno},${Ry} ${Rx},${thick/deno} ${startCurveXPoint},${thick/deno} L${width-startCurveXPoint},${thick/deno}`;

    // const BC = "C390,3 397,10 397,50 L397,250 ";
    const BC = `C${width-Rx},${thick/deno} ${width-thick/deno},${Ry} ${width-thick/deno},${startCurveYPoint} L${width-thick/deno},${height-startCurveYPoint}`;

    // const CD = "C397,290 390,297 350,297 L50,297 ";
    const CD = `C${width-thick/deno},${height-Ry} ${width-Rx},${height-thick/deno} ${width-startCurveXPoint},${height-thick/deno} L${startCurveXPoint},${height-thick/deno}`;

    // const DA = "C10,297 3,290 3,250 L3,50";
    const DA = `C${Rx},${height-thick/deno} ${thick/deno},${height-Ry} ${thick/deno},${height-startCurveYPoint} L${thick/deno},${startCurveYPoint} z`;

    this.borderPathRef.current.setAttribute('d', AB+BC+CD+DA);
      
  }
  
  public componentDidUpdate(): void {
    if (this.borderPathRef.current && this.borderPathContainerRef.current) {
      this.resizePathBorder();
    }
  }
  
  render() {
    const items = React.Children.toArray(this.props.children);

    return <>
      {
        items.map((item: React.ReactElement|any) => {
          if (this.state.isMobileView) return item;
          return createReflectingChild(item, this);
          
        })
      }
    </>

  }
}


export default Reflection;