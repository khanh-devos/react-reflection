import Reflection from "../Reflection";


export const showLight = (
    event: MouseEvent,
    reflection: Reflection,
  ) => {
    
    if (reflection.state.isMobileView) {
      if (reflection.lightRef.current) reflection.lightRef.current.remove()
      return;
    }

    if (!reflection.lightRef.current) return;

    const WIDTH = window.innerWidth || 1500;
  
  
    const a = Number(event.clientX)/WIDTH * 100;
    
  
    if ((a < 30 || a > 70)) {

      reflection.lightRef.current.style.background = 'none';
      // hiding underground
      reflection.lightRef.current.style.zIndex = '-1';  

      return;
    }
    
  
    const b = a * 1;
    const c = a * 1.5;
    const d = a * 2;
    const e = a * 3;
  
    
    reflection.lightRef.current.onmouseenter = () => {
      if (reflection.lightRef.current) reflection.lightRef.current.style.scale = '0';
    };

    reflection.lightRef.current.onmouseout = () => {
      if (reflection.lightRef.current && reflection.lightRef.current.style.scale !== '0') return;
      setTimeout(() => {
        if (reflection.lightRef.current) reflection.lightRef.current.style.scale = '1' 
      }, 2000);
    };

    // showing up
    reflection.lightRef.current.style.zIndex = `100`;

    if (reflection.props.light) reflection.lightRef.current.style.background = `repeating-linear-gradient(
    ${reflection.props.angle}deg, 
    ${reflection.props.sideColor} ${a}%, 
    ${reflection.props.sideColor} ${b}%, 
    ${reflection.props.color} ${c}%, 
    ${reflection.props.sideColor} ${d}%, 
    ${reflection.props.sideColor} ${e}%)`;
        
  
    
    // if (reflection.props.sun) reflection.lightRef.current.style.background = 'radial-gradient(circle, whitesmoke 3%, lavender 4%, transparent 20%)';
    
  
}

export const showSun = (
  event: MouseEvent,
  reflection: Reflection,
) => {
  
  if (reflection.state.isMobileView) {
    if (reflection.lightRef.current) reflection.lightRef.current.remove()
    return;
  }

  if (!reflection.sunRef.current) return;

  const WIDTH = window.innerWidth || 1500;


  const a = Number(event.clientX)/WIDTH * 100;
  

  if ((a < 30 || a > 70)) {

    reflection.sunRef.current.style.background = 'none';
    // hiding underground
    reflection.sunRef.current.style.zIndex = '-1';  

    return;
  }
  
  
  reflection.sunRef.current.onmouseenter = () => {
    if (reflection.sunRef.current) reflection.sunRef.current.style.scale = '0';
  };

  reflection.sunRef.current.onmouseout = () => {
    if (reflection.sunRef.current && reflection.sunRef.current.style.scale !== '0') return;
    setTimeout(() => {
      if (reflection.sunRef.current) reflection.sunRef.current.style.scale = '1' 
    }, 2000);
  };

  // showing up
  reflection.sunRef.current.style.zIndex = `100`;

  if (reflection.props.sun) {
    reflection.sunRef.current.style.background = `radial-gradient(circle, whitesmoke 7.5%, ${reflection.props.color} 8%, transparent 20%)`
  }
  

}