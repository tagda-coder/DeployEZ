const MAX_LEN = 5;

export function generate(){
    let ans = "";
    const subset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for(let i=0; i<MAX_LEN; i++){
        const randomIndex = Math.floor(Math.random() * subset.length);
        ans += subset[randomIndex];
    }
    return ans;
}