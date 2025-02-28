
## Minimal Implementation Spec
Create a focused spec addressing the core user need.
We have an existing Farcaster miniapp (Frame v2) template to work with.
We need to customize the template in form and function to meet the user requirements.

### Output Format
1. Core Functionality
   - Main user flow
   - Required API endpoints
   - Key data structures

2. Implementation Approach
   - Frame structure (screens/actions)
   - External API integration points
   - State management approach

3. Technical Considerations
   - API authentication needs
   - Critical error scenarios

### API Context
Farcaster is a decentralized social network built on Ethereum, emphasizing user data ownership and interoperability. Each user connects their Ethereum wallet, ensuring secure identity verification and seamless integration with blockchain-based applications. ￼

Developers can leverage Farcaster’s open protocol to create innovative applications. The platform offers various tools and APIs to facilitate this process. For instance, the Farcaster-py SDK allows developers to programmatically interact with the Farcaster network using Python, enabling tasks such as posting messages, retrieving user information, and more. ￼

Additionally, Farcaster supports the development of “frames,” which are mini-apps that run inside a Farcaster feed. These frames enable rich, interactive experiences without requiring users to leave their social feed. Frameworks like Frog have been developed to simplify the creation of these frames, providing a minimal footprint and utilities for common tasks. ￼

Farcaster’s architecture includes Hubs, which are distributed servers that store and validate data. Developers can run their own Hubs to gain real-time access to Farcaster data, enhancing the decentralization and resilience of the network. ￼

The platform’s integration with blockchain technology ensures that user data is secure and tamper-proof. By leveraging Ethereum’s capabilities, Farcaster provides a censorship-resistant environment where users maintain control over their social interactions. ￼

For more detailed information on building with Farcaster, including tutorials and API documentation, developers can refer to the official Farcaster documentation.￼https://docs.farcaster.xyz/developers/

# fetch-power-users-lite

**Endpoint**: `GET /farcaster/user/power_lite`

## Description
Fetches power users and respond in a backwards compatible format to Warpcast's deprecated power badge endpoint.

## Parameters

## Response
```yaml
type: object
required:
- result
properties:
  result:
    type: object
    required:
    - fids
    properties:
      fids:
        type: array
        items:
          type: integer
          format: int32
          description: The unique identifier of a farcaster user (unsigned integer)
          examples:
          - 3
          - 191
          - 2
          - 194
          - 19960
        description: List of FIDs
```

### User Prompt
Create a link tree frame that shows my social links and allows users to navigate between them. Include links to: Farcaster, GitHub, and other links I've shared recently.
