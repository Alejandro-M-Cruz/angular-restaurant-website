const stripe = require('stripe')('sk_test_51MyyGlAwqI0tPo96rPSHQYi4GUSHwWVL0Xqkwvq8bbNLMOivhdIrEt1PaK6YCQ4Q40KNC8BxpDBvwfGTvCicFCEL00yFjBED2C');

async function createProduct(name, description, price, currency, image) {
  return stripe.products.create({
    name: name,
    description: description,
    images: [image],
    default_price_data: {
        currency: currency,
        unit_amount: price,
    },
  });
}

function retrieveProductInformationById(id) {
    return stripe.products.retrieve(id);
}

function updateProduct(id, name, description, price, currency, image) {
    return stripe.products.update(id, {
        name: name,
        description: description,
        images: [image],
        default_price_data: {
            currency: currency,
            unit_amount: price,
        },
    });
}

function deleteProduct(id) {
    return stripe.products.update(id, {
        active: false
    });
}

module.exports = {
    createProduct,
    retrieveProductInformationById,
    updateProduct,
    deleteProduct
};