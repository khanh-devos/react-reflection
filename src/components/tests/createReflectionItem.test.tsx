import React from "react";
import { render, screen } from "@testing-library/react";
import Reflection from "../Reflection/Reflection";



describe("Reflection", () => {
  it("renders the Reflection component", () => {
    
    const { asFragment } = render(
      <Reflection
        angle={100}
        color="red"
        sideColor="black"
        borderRadius="10px"
      >
        <div
          style={{
            width: '200px', height: '100px'
          }}
        >This is for testing.</div>
      </Reflection>
    );


    expect(asFragment).toMatchSnapshot();
    
  });

  it("check parent and child existence", () => {
    
    render(
      <Reflection
        angle={100}
        color="red"
        sideColor="black"
        borderRadius="10px"
      >
        <div
          style={{
            width: '200px', height: '100px'
          }}
        >This is for testing.</div>
      </Reflection>
    );


    const parent = screen.findByRole('reflection-parent');
    const child = screen.findByRole('light-child');
    expect(parent).toBeTruthy();
    expect(child).toBeTruthy();
    
  });
  

  it("check parent and child existence", () => {
    
    render(
      <Reflection
        light={false}
        sun={true}
        angle={100}
        color="red"
        sideColor="black"
        borderRadius="10px"
      >
        <div
          style={{
            width: '200px', height: '100px'
          }}
        >This is for testing.</div>
      </Reflection>
    );


    const parent = screen.findByRole('reflection-parent');
    const child = screen.findByRole('sun-child');
    expect(parent).toBeTruthy();
    expect(child).toBeTruthy();
    
  });
});