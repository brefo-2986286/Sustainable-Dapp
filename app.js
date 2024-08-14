const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

document.getElementById('donationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;

    // Logic to convert amount based on selected currency
    let convertedAmount = amount;
    if (currency === 'USD') {
        // Add conversion logic from USD to XLM if needed
    } else if (currency === 'EUR') {
        // Add conversion logic from EUR to XLM if needed
    }

    // Create a new transaction
    const account = await server.loadAccount('GBEH57T7S252BTEX7RPYT44CL4CVHL4FHSJVCE2K62D22X6GBCZJIMMQ');
    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET
    })
        .addOperation(StellarSdk.Operation.payment({
            destination: 'GBEH57T7S252BTEX7RPYT44CL4CVHL4FHSJVCE2K62D22X6GBCZJIMMQ',
            asset: StellarSdk.Asset.native(),
            amount: convertedAmount.toString()
        }))
        .setTimeout(30)
        .build();

    // Sign the transaction
    transaction.sign(StellarSdk.Keypair.fromSecret('SCCNOYSZVSWLCW6S47WTYIHUOFRMIZMKJJO5HJBV5WUP6DKDM5UKTLN7'));

    // Submit the transaction
    try {
        const result = await server.submitTransaction(transaction);
        console.log('Transaction successful:', result);
        
        // Display thank you message
        document.getElementById('thankYouMessage').style.display = 'block';
    } catch (error) {
        console.error('Transaction failed:', error);
    }
});
