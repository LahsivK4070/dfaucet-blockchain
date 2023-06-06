import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

    var owner : Principal = Principal.fromText("57v3k-2d3jr-gtkmh-56jjb-e7abs-4lwz4-gddue-tdimo-kef3t-jv453-aae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DVIS";

    private stable var balanceEntries: [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if(balances.size() < 1){
        balances.put(owner, totalSupply);
    };

    public query func balanceOf(who: Principal) : async Nat {

        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
        
    };

    public query func getSymbol() : async Text {

        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        // Debug.print(debug_show (msg.caller));
        if(balances.get(msg.caller) == null){
            let amount = 10000;
           let res = await transfer(msg.caller, amount);
            return res;
        }else{
            return "Already CLaimed";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {

        let fromBal = await balanceOf(msg.caller);
        if(fromBal > amount){
            let newFromBal: Nat = fromBal - amount;
            balances.put(msg.caller, newFromBal);

            let toBal = await balanceOf(to);
            let newToBal : Nat = toBal + amount;
            balances.put(to, newToBal);

            return "Success";
        }else{
            return "Insufficient funds";
        }
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash); 
        if(balances.size() < 1){
            balances.put(owner, totalSupply);
        };
    };
};

