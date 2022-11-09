# Get Started

In the sandbox to the right you should find the following code:

```js
onAddMona();
```

This generates a new Mona on page click.

---

You can also customize the color of the confetti.

```js
onAddMona({
  confettiColors: ["black", "pink", "white"]
});
```

---

Or even whether there is any confetti

```js
onAddMona({
  hasConfetti: false
});
```

---

You can also customize which images to use:

```js
onAddMona({
  imageNames: [
      "angry",
      "eyeroll",
      "grimace",
      "heart_eyes",
      "hearts",
      "laughing",
      "mindblown",
      "puke",
      "startled",
      "tongue_out",
      "walk",
      "shadow_walk",
      "loading",
      "pacman",
      "dance"
  ],
});
```
---

Or how long it the Mona is on-screen:

```js
onAddMona({
  duration: 5000
});
```
---

And lastly, what element the Mona appears in:

```js
const box = document.createElement("div")
box.style.position = "fixed"
box.style.bottom = "0"
box.style.right = "0"
box.style.width = "400px"
box.style.height = "400px"
document.body.appendChild(box)

onAddMona({
  parentElement: box
});
```