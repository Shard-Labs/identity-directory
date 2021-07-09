# Identity Directory and Blockchain Node Integration

The **blockchain** node is provided to the Identity Directory as a Docker image, also
there is an option for a user to choose any other node through the application, including 
Polkadot and Kusama offical websocets or a custom one.

Application uses library [polkadit.js](https://polkadot.js.org/docs/) to estublish these connections 
and everything else needed as fetching user Identity, sending tokens, etc.


# Identity Directory and Polakscan API Integration

The batch fetching of identities is provided by [polkascan's API](https://polkascan.io/)

# Architecture Diagram
![Architecure](./assets/architecture.jpg)