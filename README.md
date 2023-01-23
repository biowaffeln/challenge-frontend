# Challenge Solution

Here's my solution to the frontend challenge. Some notes on the decisions I made:

- I didn't have access to the fonts used in the design, so I used some close matches from Google Fonts.
- I ended up replacing most of the icons to more closely match the design.
- Some data in the design was missing from the API (eg. number of reviews, name of the clinic, etc.), so I either hard-coded it or left it out.
- I decided to tie the sorting state on the home page to the URL. That way it's easier to share and ties into the browser history, which I think is a nice touch. However, it might lead to a small flash in the UI when directly visiting a sorted url, since the doctors only get sorted once the JS loads.
