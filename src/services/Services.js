class Services {

    _apiSmall = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    _apiBig = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

    postResource = (obj) => {
        fetch(this._apiSmall, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }


    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getSmallClientsList = async () => {
        const res = await this.getResource(this._apiSmall);
        return res
    }

    getBigClientsList = async () => {
        const res = await this.getResource(this._apiBig);
        return res
    }


}

export default Services;