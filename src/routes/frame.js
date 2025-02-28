export async function GET() {
  return new Response(
    `<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="${process.env.BASE_URL}/frame-image">
  <meta property="fc:frame:button:1" content="Farcaster">
  <meta property="fc:frame:button:2" content="GitHub">
  <meta property="fc:frame:button:3" content="More">
</head>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}

export async function POST() {
  return Response.redirect(`${process.env.BASE_URL}/frame`);
}
