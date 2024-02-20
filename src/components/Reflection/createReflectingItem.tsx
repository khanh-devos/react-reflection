import { v4 as uuidv4 } from 'uuid';
import * as React from 'react';
import Reflection from './Reflection';

const createBorderSVG = (reflection: Reflection): React.ReactSVGElement => {
  const feMergeNode1 = React.createElement('feMergeNode', {
    in: "offsetBlur", 
    key: uuidv4()
  });

  const feMergeNode2 = React.createElement('feMergeNode', {
    in: "litPaint", 
    key: uuidv4()
  });
    
  const feMerge = React.createElement('feMerge', {
    key: uuidv4()
  }, [feMergeNode2]);

  const feComposite2 = React.createElement('feComposite', {
    in: "SourceGraphic",
    in2: "specOut",
    operator: "arithmetic",
    k1: "1",
    k2: "1",
    k3: "1",
    k4: "0",
    result: "litPaint",
    key: uuidv4()
  });

  const feComposite1 = React.createElement('feComposite', {
    in: "specOut",
    in2: "SourceAlpha",
    operator: "in",
    result: "specOut",
    key: uuidv4()
  });

  const fePointLight = React.createElement('fePointLight', {
    ref: reflection.borderShineRef,
    x: "-10000",
    y: "-10000",
    z: "10000",
    id: "light",
    key: uuidv4()
  });

  const feSpecularLighting = React.createElement('feSpecularLighting', {
    in: "blur",
    surfaceScale: "7",
    specularConstant: "0.85",
    specularExponent:"20",
    lightingColor: reflection.props.borderShiningColor || "#c2d9ff",
    result: "specOut",
    key: uuidv4()
  }, [fePointLight]);

  const feOffset = React.createElement('feOffset', {
    in: "blur",
    dx: "0",
    dy: "0",
    result: "offsetBlur",
    key: uuidv4()
  });

  const feGaussianBlur = React.createElement('feGaussianBlur', {
    in: "SourceAlpha",
    stdDeviation: "4",
    result: "blur",
    key: uuidv4()
  });

  const filter = React.createElement(
    'filter',
    {
      id: 'MyFilter4',
      filterUnits: 'userSpaceOnUse',
      x: '0',
      y: '0',
      width: '100%',
      height: '100%',
      key: uuidv4()
    },
    [feGaussianBlur, feOffset, feSpecularLighting,
      feComposite1, feComposite2, feMerge]
  );

  const defs = React.createElement('defs', {
    key: uuidv4()
  }, [filter]);

  const path = React.createElement(
    'path', 
    { 
      ref: reflection.borderPathRef,
      key: uuidv4(),
      fill: 'none',
      stroke: reflection.props.borderColor || 'skyblue', 
      strokeWidth: "20",
    }
  );

  const g = React.createElement('g', { 
    filter: "url(#MyFilter4)",
    key: uuidv4()
  }, [path]);

  return React.createElement(
    'svg', 
    {
      width: '100%', height: '100%',
      draggable: false,
      key: uuidv4(),
    },
    [defs, g]
  );
}

export const createReflectingChild = (
  item: React.ReactElement|any ,
  reflection: Reflection
): React.ReactElement => {
  
  // Create a container to include all the children.
  const reflectionItems: Array<React.ReactElement> = [];

  if (reflection.props.light) {
    reflectionItems.push(React.createElement('div', {
      ref: reflection.lightRef,
      key: uuidv4(),
      style: {
        position: 'absolute',
        top: '0', left: '0', bottom: '0', right: '0',
        width: '100%', height: '100%',
        zIndex: '100',
        opacity: '0.5',
        borderRadius: reflection.props.borderRadius || 'inherit',
      }
    }))
  }

  if (reflection.props.sun) {
    reflectionItems.push(React.createElement('div', {
      ref: reflection.sunRef,
      key: uuidv4(),
      style: {
        position: 'absolute',
        top: '0', left: '0', bottom: '0', right: '0',
        width: '100%', height: '100%',
        zIndex: '101',
        opacity: '.5',
      }
    }))
  }

  if (reflection.props.border) {
    const svg: React.ReactSVGElement = createBorderSVG(reflection);

    reflectionItems.push(React.createElement(
      'div',
      {
        key: uuidv4(),
        ref: reflection.borderPathContainerRef,
        style: {
          position: 'absolute',
          top: '0', left: '0', bottom: '0', right: '0',
          width: '100%', height: '100%',
          zIndex: '99',
          scale: '1 1',
        }
      },
      [svg]
    ))

  }

  const keyItem = React.cloneElement(item, {key: uuidv4()})

  const parent = React.createElement(
    'div',
    {
      key: uuidv4(),
      style: {
        position: 'relative', 
        width: '100%', height: '100%',
        zIndex: '0', 
        margin: reflection.props.margin,
        padding: '0',
      }
    },
    [keyItem, [...reflectionItems]]
  )

  return parent

}