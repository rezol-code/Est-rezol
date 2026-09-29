```typescript
import { AppProps } from "next/app"

function MyApp({ Component, pageProps, ...props }: AppProps) {
  return (
    <div>
      <Component
        {...pageProps}
      />
    </div>
  );
}

export default MyApp;
```