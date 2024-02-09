import { v4 as uuidv4 } from 'uuid';
import * as React from 'react';
import Reflection from './Reflection';



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
      role: 'light-child',
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
      role: 'sun-child',
      style: {
        position: 'absolute',
        top: '0', left: '0', bottom: '0', right: '0',
        width: '100%', height: '100%',
        zIndex: '101',
        opacity: '.5',
      }
    }))
  }

  const keyItem = React.cloneElement(item, {
    key: uuidv4()
  })

  const parent = React.createElement(
    'div',
    {
      key: uuidv4(),
      role: 'reflection-parent',
      style: {
        position: 'relative', 
        width: '100%', height: '100%',
        zIndex: '0', 
        margin: reflection.props.margin,
        padding: '0'
      }
    },
    [keyItem, [...reflectionItems]]
  )

  return parent

}