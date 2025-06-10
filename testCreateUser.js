const userPresenter = require('./src/backend/presenters/UserPresenter'); // langsung instance

async function testCreate() {
    const userData = {
        name: 'Januar Bani',
        email: 'januarBani@example.com'
    };

    const result = await userPresenter.createUser(userData); // panggil method langsung

    if (result.success) {
        console.log('User created:', result.data);
    } else {
        console.log('Failed to create user:', result.error);
    }
}

testCreate();
