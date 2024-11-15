        const TIERS = {
            35: {
                "single": {
                    USD: 34.95,
                    EUR: 34.95,
                    GBP: 29.95
                },
                "double": {
                    USD: 54.95,
                    EUR: 54.95,
                    GBP: 49.95
                },
                "family": {
                    USD: 79.95,
                    EUR: 79.95,
                    GBP: 69.95
                },
            },
            40: {
                "single": {
                    USD: 39.95,
                    EUR: 39.95,
                    GBP: 34.95
                },
                "double": {
                    USD: 59.95,
                    EUR: 59.95,
                    GBP: 51.95
                },
                "family": {
                    USD: 89.95,
                    EUR: 89.95,
                    GBP: 74.95
                },
            },
            30: {
                "single": {
                    USD: 29.95,
                    EUR: 29.95,
                    GBP: 25.95
                },
                "double": {
                    USD: 44.95,
                    EUR: 44.95,
                    GBP: 39.95
                },
                "family": {
                    USD: 69.95,
                    EUR: 69.95,
                    GBP: 61.95
                },
            },
            70: {
                "single": {
                    USD: 69.95,
                    EUR: 69.95,
                    GBP: 59.95
                },
                "double": {
                    USD: 104.95,
                    EUR: 104.95,
                    GBP: 84.95
                },
                "family": {
                    USD: 154.95,
                    EUR: 154.95,
                    GBP: 124.95
                },
            },
            75: {
                "single": {
                    USD: 74.95,
                    EUR: 74.95,
                    GBP: 64.95
                },
                "double": {
                    USD: 114.95,
                    EUR: 114.95,
                    GBP: 99.95
                },
                "family": {
                    USD: 164.95,
                    EUR: 164.95,
                    GBP: 139.95
                },
            },
            80: {
                "single": {
                    USD: 79.95,
                    EUR: 79.95,
                    GBP: 69.95
                },
                "double": {
                    USD: 119.95,
                    EUR: 119.95,
                    GBP: 104.95
                },
                "family": {
                    USD: 179.95,
                    EUR: 179.95,
                    GBP: 154.95
                },
            },
            90: {
        "single": {
            USD: 89.95,
            EUR: 89.95,
            GBP: 76.95
        },
        "double": {
            USD: 134.95,
            EUR: 134.95,
            GBP: 115.95
        },
        "family": {
            USD: 199.95,
            EUR: 199.95,
            GBP: 167.95
        },
    },
    1: {
        "single": {
            USD: 39.95,
            EUR: 39.95,
            GBP: 30.95
        },
        "double": {
            USD: 63.95,
            EUR: 63.95,
            GBP: 49.95
        },
        "family": {
            USD: 127.95,
            EUR: 127.95,
            GBP: 99.95
        },
    },
    2: {
        "single": {
            USD: 29.95,
            EUR: 29.95,
            GBP: 22.95
        },
        "double": {
            USD: 47.95,
            EUR: 47.95,
            GBP: 36.95
        },
        "family": {
            USD: 95.95,
            EUR: 95.95,
            GBP: 74.95
        },
    },
    1.1: {
        "single": {
            USD: 119.95,
            EUR: 119.95,
            GBP: 101.95
        },
        "double": {
            USD: 191.95,
            EUR: 191.95,
            GBP: 162.95
        },
        "family": {
            USD: 383.95,
            EUR: 383.95,
            GBP: 325.95
        },
    },
    2.2: {
        "single": {
            USD: 79.95,
            EUR: 79.95,
            GBP: 67.95
        },
        "double": {
            USD: 127.95,
            EUR: 127.95,
            GBP: 108.95
        },
        "family": {
            USD: 255.95,
            EUR: 255.95,
            GBP: 217.95
        },
    },
};

        const g_OldPlans = [];

        let inTier = null,
            inTargetTier = null,
            inPlan = null,
            inTargetPlan = null,
            inCurrency = null,
            inTier2 = null,
            inPlan2 = null,
            discount1 = null,
            discount2 = null,
            discount3;

        function coupon() {
            orig = prompt("Enter the original price of the plan")
            newPrice = prompt("Enter the targeted price")
            result = ((orig - newPrice) / orig) * 100
            result = Math.round(result * 10000) / 10000


            if (isNaN(result) || !orig || !newPrice) {
                return alert("Please enter the amounts correctly");
            } else
                return alert(`The discount amount in percent is ${result}`)
        }

        function calcInternal(oldPlan, targetPlan, _discount, currency) {
            if (!oldPlan || !targetPlan || !currency) {
                document.getElementById("result-label").innerText = "Please fill in all the fields.";
                document.getElementById("result-label").className = "error-label";
                return null;
            }

            let discount = _discount / 100;
            let targetPrice = targetPlan[currency];
            targetPrice = targetPrice - (targetPrice * discount);
            let currentPrice = oldPlan[currency];
            currentPrice = currentPrice - (currentPrice * discount);
            let couponValue = 0;

            return {
                currency,
                price: currentPrice,
                discountAmount: Math.round(couponValue * 10000) / 10000,
                couponValue
            };
        }

        function calc() {
            for (let i = 0; i < g_OldPlans.length; i++) {
                if (!g_OldPlans[i] || isNaN(g_OldPlans[i].discount)) {
                    document.getElementById("result-label").innerText = "Please fill in all the fields.";
                    document.getElementById("result-label").className = "error-label";
                    return;
                }
            }

            inTargetTier = document.getElementById("target-tier-select").value;
            inTargetPlan = document.getElementById("target-plan-select").value;
            inTargetDiscount = document.getElementById("target-discount-select").value;
            inCurrency = document.getElementById("currency-select").value;
            let discount = parseFloat(inTargetDiscount) / 100;

            if (!inTargetTier || !inTargetPlan || isNaN(discount) || !inCurrency) {
                document.getElementById("result-label").innerText = "Please fill in all the fields.";
                document.getElementById("result-label").className = "error-label";
                return;
            }

            if ([0, 20, 25, 30, 40, 50].indexOf(parseFloat(inTargetDiscount)) === -1) {
                document.getElementById("result-label").innerText = "Invalid discount value.";
                document.getElementById("result-label").className = "error-label";
            } else {
                // 50%/40%/30% discount applies to price of old plan
                const targetPlan = TIERS[inTargetTier][inTargetPlan][inCurrency];

                let totalDiscountAmount = 0,
                    totalCurrentPrice = 0,
                    totalCoupounValue = 0;
                for (let i = 0; i < g_OldPlans.length; ++i) {
                    const oldPlan = g_OldPlans[i];
                    const r = calcInternal(oldPlan, targetPlan, oldPlan.discount, inCurrency);
                    totalDiscountAmount = totalDiscountAmount + r.discountAmount;
                    totalCurrentPrice = totalCurrentPrice + r.price;
                    totalCoupounValue = totalCoupounValue + r.couponValue;
                }

                let targetPrice = TIERS[inTargetTier][inTargetPlan][inCurrency];
                let couponPerc = TIERS[inTargetTier][inTargetPlan][inCurrency];
                targetPrice = targetPrice - (targetPrice * discount);
                let currentPrice = totalCurrentPrice;
                let diff = targetPrice - currentPrice;
                let couponValue = totalCoupounValue;
                couponValue = ((couponPerc - diff) / couponPerc) * 100

                if (diff > 0) {
                    document.getElementById("result-label").innerText = `The price difference is ${inCurrency} ${Math.round(diff * 1000) / 1000} \n\nThe discount amount in % is ${Math.round(couponValue * 10000) / 10000}`;
                    document.getElementById("result-label").className = "success-label";
                } else {
                    document.getElementById("result-label").innerText = `The price difference is ${inCurrency} ${Math.round(diff * 1000) / 1000}`;
                    document.getElementById("result-label").className = "success-label";
                }
            }
        }

        function onOldplanDropdownSelChange(tableRow) {
            let tierDropdown = tableRow.querySelector(".tier-dropdown");
            let planDropdown = tableRow.querySelector(".plan-dropdown");
            let discountDropdown = tableRow.querySelector(".discount-dropdown");
            const tier = tierDropdown.value;
            const plan = planDropdown.value;
            const index = tableRow.dataset.index;
            let planInfo = g_OldPlans[index];

            const discount = parseFloat(discountDropdown.value);
            if (tier && plan && !isNaN(discount)) {
                planInfo = TIERS[tier][plan];
                planInfo = JSON.parse(JSON.stringify(planInfo));
                planInfo.discount = discount;
            }

            g_OldPlans[index] = planInfo;
            console.debug(planInfo);
        }

        function createTierDropdown(tableRow) {
            const dropdown = document.createElement("select");
            dropdown.className = "tier-dropdown";
            dropdown.onchange = () => {
                onOldplanDropdownSelChange(tableRow);
            };

            // Add blank item
            const blankItem = document.createElement("option");
            blankItem.value = "";
            blankItem.innerText = "---";
            dropdown.appendChild(blankItem);

            // Add rest of items
            const items = ["CMMX", "30", "35", "40", "70", "75", "80", "90", "CMM5", "sub", "1", "2", "onetime", "1.1", "2.2"];
            for (let i = 0; i < items.length; i++) {
                let opt = document.createElement("option");
                opt.innerText = items[i];
                opt.value = items[i].toString();
                dropdown.appendChild(opt);
            }

            return dropdown;
        }

        function createPlanDropdown(tableRow) {
            const dropdown = document.createElement("select");
            dropdown.className = "plan-dropdown";
            dropdown.onchange = () => {
                onOldplanDropdownSelChange(tableRow);
            };

            // Add blank item
            const blankItem = document.createElement("option");
            blankItem.value = "";
            blankItem.innerText = "---";
            dropdown.appendChild(blankItem);

            // Add rest of items
            const items = ["single", "double", "family"];
            for (let i = 0; i < items.length; i++) {
                let opt = document.createElement("option");
                opt.innerText = items[i][0].toUpperCase() + items[i].substring(1);
                opt.value = items[i].toString();
                dropdown.appendChild(opt);
            }

            return dropdown;

        }

        function createDiscountDropdown(tableRow) {
            const dropdown = document.createElement("select");
            dropdown.className = "discount-dropdown";
            dropdown.onchange = () => {
                onOldplanDropdownSelChange(tableRow);
            };

            // Add blank item
            const blankItem = document.createElement("option");
            blankItem.value = "";
            blankItem.innerText = "---";
            dropdown.appendChild(blankItem);

            // Add rest of items
            const items = ["0", "20", "25", "30", "40", "50"];
            for (let i = 0; i < items.length; i++) {
                let opt = document.createElement("option");
                opt.innerText = items[i] + "%";
                opt.value = items[i];
                dropdown.appendChild(opt);
            }

            return dropdown;


        }

        function deleteOldPlan(tableRow) {
            g_OldPlans.splice(tableRow.dataset.index, 1);
            tableRow.remove();
        }

        function addOldPlan() {
            g_OldPlans.push(null);

            const planNumber = g_OldPlans.length;
            const planName = "Old Plan [" + planNumber + "]";

            const row = document.createElement("tr");
            const index = g_OldPlans.length - 1;
            row.dataset.index = index;
            let cell = document.createElement("td");

            // Add name cell
            cell.innerText = planName;
            row.appendChild(cell);

            // Add tier cell
            cell = document.createElement("td");
            const tierDropdown = createTierDropdown(row);
            cell.appendChild(tierDropdown);
            row.appendChild(cell);

            // Add plan cell
            cell = document.createElement("td");
            const planDropdown = createPlanDropdown(row);
            cell.appendChild(planDropdown);
            row.appendChild(cell);

            // Add discount cell
            cell = document.createElement("td");
            const discountDropdown = createDiscountDropdown(row);
            cell.appendChild(discountDropdown);
            row.appendChild(cell);

            cell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.onclick = () => deleteOldPlan(row);
            deleteButton.innerText = "x";
            cell.appendChild(deleteButton);
            row.appendChild(cell);

            document.getElementById("old-plan-marker-row").insertAdjacentElement("beforebegin", row);
        }
