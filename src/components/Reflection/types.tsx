export interface ReflectionProps {
  children?: any,
  myWhite?: string,
  color?: string,
  sideColor?: string,
  angle?: number,
  borderRadius?: string,
  sun?: boolean,
  light?: boolean,
  position?: string,
  margin?: string,
  border?: boolean,
  borderColor?: string,
  borderWidth?: number,
  borderRadiusRatio?: number
  borderPathScale?: number
  borderShiningColor?: string,
  
}

export interface ReflectionState  extends ReflectionProps {
  myWhite?: string,
  isMobileView?: boolean,
  borderUpdate?: boolean
}