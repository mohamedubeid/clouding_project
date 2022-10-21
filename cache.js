module.exports = class Cache {

    items = new Map();
    capacity = 20 * 1000;
    lru_policy = false;
    size = 0;
    numberOfRequest = 0;
    miss = 0;
    hit = 0;

    constructor(capacity, lru_policy) {
      this.capacity = capacity * 1000;
      this.lru_policy = lru_policy;
    }

    GET(key) {
         if(this.items.has(key)) {
            const value = this.items.get(key);
            if(this.lru_policy) {
                this.items.delete(key);
                this.items.set(key, value);
            }
            this.numberOfRequest++;
            this.hit++;
            return value;
         }
         this.numberOfRequest++;
         this.miss++;
            return -1;
    }
    //value => {img, imgSize}
    PUT(key, value) {
        while(value.imgSize + this.size > this.capacity) {
            if(this.lru_policy) {
                const [LRU_Item] = this.items.keys();
                this.invalidateKey(LRU_Item);
            }else {
                const randomNum = Math.floor(Math.random() * this.items.size) + 1; 
                const keys = this.items.keys();

                while (randomNum > 1) {
                    keys.next();
                    randomNum--;
                }
                this.invalidateKey(keys.next().value);
            }
        }
        this.items.set(key, value);
        this.size += value.imgSize;
    }
    
    invalidateKey(key) {
        if(this.items.has(key)){
            const item = this.items.get(key);
            this.size -= item.imgSize;
            return this.items.delete(key)
        }
        return false;
    }

    getPolicy() {
        return this.lru_policy? 'Least Recently Used' : 'Random Replacement'
    }

    setPolicy(policy) {
        if(policy === 'lru') {
            this.lru_policy = true;
        }else{
            this.lru_policy = false;
        }
    }

    getCapacity() {
        const capacity = this.capacity / 1000;
        return capacity + 'MB';
    }

    setCapacity(capacity) {
        while(capacity < this.size) {
            if(this.lru_policy) {
                const [LRU_Item] = this.items.keys();
                this.invalidateKey(LRU_Item);
            }else {
                const randomNum = Math.floor(Math.random() * this.items.size) + 1; 
                const keys = this.items.keys();

                while (randomNum > 1) {
                    keys.next();
                    randomNum--;
                }
                this.invalidateKey(keys.next().value);
            }
        }
        this.capacity = capacity;
    }

    CLEAR() {
        this.items.clear();
    }

    getNumberOfItems() {
        return this.items.size;
    }

    getSize() {
        return this.size;
    }

    getNumberOfRequest() {
        return this.numberOfRequest;
    }

    getmissRate() {
        const missRate = (this.miss / this.numberOfRequest) * 100;
        return  missRate + '%';

    }
    getHitRate() {
        const hitRate = (this.hit / this.numberOfRequest ) * 100;
        return  hitRate + '%';
    }
  }
  