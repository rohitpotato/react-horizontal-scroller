
# React Horizontal Scroller

A horizontal scrolling utility for react apps, just pass your data to get started.

## Quick start

```npm install @rohitpotato/react-horizontal-scroller```

## Demo

https://codesandbox.io/s/wizardly-feynman-3bgrp2?file=/src/App.js

![react-horizontal-scroller](https://rohit-misc.s3.ap-south-1.amazonaws.com/react-horizontal-scroller.gif "Text to show on mouseover").



## Example Usage

```
import "./styles.css";

import HorizontalScroller, {
  useScroller
} from "@rohitpotato/react-horizontal-scroller";
import { imgUrls } from "./images";

const LeftArrow = () => {
  const { scrollPrev, isFirstItemVisible } = useScroller();

  return (
    <button
      onClick={() => scrollPrev()}
      style={{
        visibility: !isFirstItemVisible ? "visible" : "hidden",
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        textAlign: "center",
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      Previous
    </button>
  );
};

const RightArrow = () => {
  const { scrollNext, isLastItemVisible } = useScroller();

  return (
    <button
      onClick={() => scrollNext()}
      style={{
        visibility: !isLastItemVisible ? "visible" : "hidden",

        height: "54px",
        width: "54px",
        background: "none",
        border: "none",
        textAlign: "center",
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translate(50%, -50%)"
      }}
    >
      Next
    </button>
  );
};

const Card = ({ image, index }) => {
  const { isItemVisible, visibleItems } = useScroller();
  return (
    <div key={index} height="200px" width="200px">
      <img height="200px" width="200px" src={image} alt={`img_${index}`} />
      <div>Visible: {String(isItemVisible(`${index}`))}</div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <div className="container">
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <HorizontalScroller
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            wrapperProps={{
              style: {
                width: "80%",
                display: "flex",
                flexDirection: "row",
                position: "relative",
                border: "1px solid red"
              }
            }}
            scrollContainerStyles={{
              margin: "30px",
              border: "none",
              display: "flex",
              gap: "20px"
            }}
          >
            {imgUrls.map((image, index) => (
              <Card key={index} itemId={index} image={image} index={index} />
            ))}
          </HorizontalScroller>
        </div>
      </div>
    </>
  );
}


```


## Props

| Prop | Type     | Description                |
| :-------- | :------- | :------------------------- |
| LeftArrow | React Component | React component for left arrow |
| Right Arrow | React Component | React component for right arrow |
| wrapperProps | Object | pass style properties for the wrapper ex: `style: {}` |
| onScroll | function | `onScroll` event handler |
| transitionBehavior | string | `smooth`, `auto` or `customFunction` |
| transitionEase | function | `Ease function, eg t => t*(2-t)` |
| transitionDuration | number | Transition duration |


## useScroller (Visibility context)

| Prop     | Description                |
| :-------- | :------------------------- |
|scrollNext|(behavior, inline, block, ScrollOptions) => void|
|scrollPrev|(behavior, inline, block, ScrollOptions) => void|
|isFirstItemVisible|boolean|
|isLastItemVisible|boolean|
|visibleItems|Array|
|isItemVisible|itemId => boolean|
|items|ItemsMap class instance|


# About

Inspired by `react-horizontal-scrolling-menu` with my own improvements for solving problems with the pacakge