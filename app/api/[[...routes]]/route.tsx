/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

const tokens = ['ETH', 'WARP', 'DEGEN'];
let currentIndex = 0;

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const token = inputText || buttonValue
  
  if (c.buttonValue === 'next') {
  currentIndex = (currentIndex + 1) % tokens.length;
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            // ? `Let's go buy${tokens[currentIndex] ? ` ${token.toUpperCase()}!!` : ''}`
            ? `Let's go buy ${tokens[currentIndex]}`
            : 'Do you want to test your luck today?'}
        </div>
      </div>
    ),
    intents: [
      // <TextInput placeholder="Enter custom fruit..." />,
      // <Button value="apples">Apples</Button>,
      // <Button value="oranges">Oranges</Button>,
      // <Button value="bananas">Bananas</Button>,
      <Button value="next">Feeling Lucky?</Button>,
      status === 'response' && <Button.Redirect location="https://app.uniswap.org/?chain=optimism">BUY & HODL</Button.Redirect>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
