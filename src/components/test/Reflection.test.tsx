import React from "react";
import { render } from "@testing-library/react";
import Reflection from "../Reflection";



describe("Reflection", () => {
  test("renders the Reflection component", () => {
    
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
      >This is for testing the Reflection component</div>
    </Reflection>);

    
  });
});