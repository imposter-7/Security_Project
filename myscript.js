var p, q, e, n, phi, d;

// var x, y;
// x = "96";
// y = "100";
// // x = [];
// // x.push("123123");
// console.log(x>y);
// for(var i = 1; i < 127; i++){
//     if(i < 32)
//         var x = String.fromCharCode(i+32);
//     else
//         var x = String.fromCharCode(i);
//     console.log(i, x);
// }


function check1() {
    p = document.getElementById("pValue").value;
    console.log(p);
    p = math.bignumber(p);
    if (p < 99999999999999999999) {
        if (math.isPrime(p)) {
            console.log(p);
            document.getElementById("qValue").removeAttribute("readonly");
            console.log("now you can use the second!");
        }
    }
    else {
        console.log(p);
        document.getElementById("qValue").removeAttribute("readonly");
        console.log("now you can use the second!");
    }
}

function check2() {
    q = document.getElementById("qValue").value;
    q = math.bignumber(q);

    if (q < 99999999999999999999) {
        if (math.isPrime(q)) {
            calculateValues();
            document.getElementById("eValue").removeAttribute("readonly");
            console.log("now you can use the third!");
        }
    }
    else {
        calculateValues();
        document.getElementById("eValue").removeAttribute("readonly");
        console.log("now you can use the third!");
    }
}

function calculateValues() {
    n = p * q;
    if (p == q)
        phi = (p - 1) * q;
    else
        phi = (p - 1) * (q - 1);

    n = math.bignumber(n);
    phi = math.bignumber(phi);
    console.log("This is p:", p * 1);
    console.log("This is q:", q * 1);
    console.log("This is n:", n * 1);
    console.log("This is phi:", phi * 1);
}

function check3() {
    e = document.getElementById("eValue").value;
    e = math.bignumber(e);
    if (math.gcd(e, phi) == 1) {
        console.log(e);
        document.getElementById("plaintext").removeAttribute("readonly");
        calculateD(e, phi);
    }
    else {
        console.log("Wrong E!!");
    }
}

function calculateD(E, Phi) {
    console.log("This is E and Phi before the algo: ", E, Phi);
    var a, b, c;
    [a, b, c] = math.xgcd(e, phi);
    d = b["value"];
    if (d < 0) {
        while (d < 0) {
            d = math.add(d, phi);
        }
    }
    console.log("This is d: ", d * 1);
    // console.log("This is egcd: ", a["value"]*1, b["value"]*1, c["value"]*1);
    // var x0 = 0, x1 = 1, y0 = 1, y1 = 0, q, tmpE;
    // while (E != 0) {
    //     q = parseInt(Phi / E);
    //     console.log("This is Phi, E, q : ", Phi, E, q);
    //     tmpE = E;
    //     E = Phi % E;
    //     Phi = tmpE;
    //     // [q, E, Phi] = [parseInt(Phi/E), Phi%E, E]
    //     console.log("This is y0, y1 before: ", y0, y1);
    //     [y0, y1] = [y1, y0 - q * y1]
    //     console.log("This is y0, y1 After: ", y0, y1);
    //     console.log("This is x0, x1 before: ", x0, x1);
    //     [x0, x1] = [x1, x0 - q * x1]
    //     console.log("This is x0, x1 After: ", x0, x1);
    // }
    // if (x0 > 0) {
    //     d = x0;
    // }
    // else {
    //     x0 = BigInt(x0);
    //     while (x0 <= 0) {
    //         x0 += Phi;
    //     }
    //     d = x0;
    // }
    // console.log("This is d: ",d);
    prints();
}

function prints() {
    console.log("This is p:", p);
    console.log("This is q:", q);
    console.log("This is n:", n);
    console.log("This is phi:", phi);
    console.log("This is d:", d);
}

var Plain, plainSplit, Cipher, cipherSplit, m, c;

function takePlain() {
    Plain = document.getElementById("plaintext").value;
    console.log(Plain);
    plainSplit = Plain.split("");
    for (let i = 0; i < plainSplit.length; i++) {
        plainSplit[i] = '' + plainSplit[i].charCodeAt(0);
        if ('' + plainSplit[i] < 100) {
            console.log("are we here?");
            plainSplit[i] = "0" + plainSplit[i];
        }
    }
    console.log("Plaintext converted to ascii array: ", plainSplit);
    protocol();
}
var protocolNum;
function protocol() {
    var nTmp = n * 1, len = 3, counter = 1;
    nTmp = '' + nTmp;

    if (nTmp.length > len) {
        while (len * (counter + 1) <= nTmp.length)
            counter++;
    }
    protocolNum = counter;
    console.log("This is protocolNum: ", protocolNum);
    prepare();
}

function prepare() {
    var tmpSplit = plainSplit;
    plainSplit = [];
    var st = '' + tmpSplit[0];
    for (var i = 1; i < tmpSplit.length; i++) {
        if (i % protocolNum == 0) {
            plainSplit.push(st);
            st = tmpSplit[i];
        }
        else {
            st += tmpSplit[i];
        }
    }
    if (st != tmpSplit[tmpSplit.length - 1]) {
        while (st.length < protocolNum * 3) {
            st += '0';
        }
        plainSplit.push(st);
    }
    console.log("Plaintext converted to ascii blocks: ", plainSplit);

    lowLevelEncryption();
}

function lowLevelEncryption() {
    var tmpNum;
    cipherSplit = [];
    console.log("This is n, n*1:", n, n * 1);
    for (var i = 0; i < plainSplit.length; i++) {
        tmpNum = math.bignumber(plainSplit[i])
        tmpNum = math.pow(tmpNum, e);
        tmpNum = math.mod(tmpNum, n);
        cipherSplit.push('' + tmpNum);
    }
    console.log("This is cipherSplit: ", cipherSplit);

    highLevelEncryption();
}

function highLevelEncryption() {
    Cipher = '';
    for (var i = 0; i < cipherSplit.length; i++) {
        var tmpConv = cipherSplit[i][0];
        for (var j = 1; j < 3 * protocolNum; j++) {
            if (j % 3 == 0) {
                tmpConv = parseInt(tmpConv);
                if (tmpConv > 126)
                    tmpConv %= 126;
                if (tmpConv < 32)
                    tmpConv += 32;
                Cipher += String.fromCharCode(tmpConv);
                tmpConv = cipherSplit[i][j];
            }
            else {
                tmpConv += cipherSplit[i][j];
            }
        }
        tmpConv = parseInt(tmpConv);
        if (tmpConv > 126)
            tmpConv %= 126;
        if (tmpConv < 32)
            tmpConv += 32;
        Cipher += String.fromCharCode(tmpConv);
    }
    console.log(Cipher);
}

