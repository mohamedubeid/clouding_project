class Chache {
    items = new Map();
    capacity = 20;
    rr = true;
    lru = false;
    size = 0;
    constructor(capacity, rr, lru) {
      this.capacity = capacity;
      this.rr = rr;
      this.lru = lru;
    }

    getItem(key) {
        return this.items.get(key)
    }
    setItem(key, value) {
        if(value.itemSize + this.size > this.capacity) {
            const arrayOfItems = Array.from(this.items);
            if(this.rr){
                const randomItem = items[Math.floor(Math.random() * this.items.size)];
                this.deleteItem(randomItem[0]);
                
            } 
        }
    }
    deleteItem(key) {
        if(this.items.has(key)){
            const item = this.items.get(key);
            this.size = this.size - item.size;
            return this.items.delete(key)
        }
        return false;
    }
  }
  