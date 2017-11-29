const fetchUserInfo = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                email: 'asdasd',
                userToken: 'adsada-asdasdaw-a2da2'
            });
        }, 1000);
    });
};

export { fetchUserInfo };
