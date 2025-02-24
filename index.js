"use strict";

/**
########################################################
#                                                      #
#   CODE  : NODEGO Bot v1.0.0 (Exstension v1.1.4)      #
#   NodeJs: v23.6.1                                    #
#   Author: Furqonflynn (cmalf)                        #
#   TG    : https://t.me/furqonflynn                   #
#   GH    : https://github.com/cmalf                   #
#                                                      #
########################################################
*/
/**
 * This code is open-source and welcomes contributions! 
 * 
 * If you'd like to add features or improve this code, please follow these steps:
 * 1. Fork this repository to your own GitHub account.
 * 2. Make your changes in your forked repository.
 * 3. Submit a pull request to the original repository. 
 * 
 * This allows me to review your contributions and ensure the codebase maintains high quality. 
 * 
 * Let's work together to improve this project!
 * 
 * P.S. Remember to always respect the original author's work and avoid plagiarism. 
 * Let's build a community of ethical and collaborative developers.
 */

const fs = require("fs/promises");
const readline = require("readline");
const axios = require("axios");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { SocksProxyAgent } = require("socks-proxy-agent");

// Global accounts list which will be populated from data.txt and proxy.txt
let accountLists = [];

const Colors = {
  Gold: "\x1b[38;5;220m",
  Red: "\x1b[31m",
  Teal: "\x1b[38;5;51m",
  Green: "\x1b[32m",
  Neon: "\x1b[38;5;198m",
  Blue: "\x1b[34m",
  Magenta: "\x1b[95m",
  Dim: "\x1b[2m",
  RESET: "\x1b[0m"
};

function CoderMark() {
  console.log(`
╭━━━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━┳╮
┃╭━━╯╱╱╱╱╱╱╱╱╱╱╱╱╱┃╭━━┫┃${Colors.Green}
┃╰━━┳╮╭┳━┳━━┳━━┳━╮┃╰━━┫┃╭╮╱╭┳━╮╭━╮
┃╭━━┫┃┃┃╭┫╭╮┃╭╮┃╭╮┫╭━━┫┃┃┃╱┃┃╭╮┫╭╮╮${Colors.Blue}
┃┃╱╱┃╰╯┃┃┃╰╯┃╰╯┃┃┃┃┃╱╱┃╰┫╰━╯┃┃┃┃┃┃┃
╰╯╱╱╰━━┻╯╰━╯┣━━┻╯╰┻╯╱╱╰━┻━╮╭┻╯╰┻╯╰╯${Colors.RESET}
╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╭━╯┃${Colors.Blue}{${Colors.Neon}cmalf${Colors.Blue}}${Colors.RESET}
╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╱╱╱╱╰━━╯
\n${Colors.RESET}NODEGO Bot ${Colors.Blue}{ ${Colors.Neon}JS${Colors.Blue} }${Colors.RESET}
    \n${Colors.Green}${'―'.repeat(50)}
    \n${Colors.Gold}[+]${Colors.RESET} DM : ${Colors.Teal}https://t.me/furqonflynn
    \n${Colors.Gold}[+]${Colors.RESET} GH : ${Colors.Teal}https://github.com/cmalf/
    \n${Colors.Green}${'―'.repeat(50)}
    \n${Colors.Gold}]-> ${Colors.Blue}{ ${Colors.RESET}NODEGO Extension${Colors.Neon} v1.1.4${Colors.Blue} } ${Colors.RESET}
    \n${Colors.Gold}]-> ${Colors.Blue}{ ${Colors.RESET}BOT${Colors.Neon} v1.0.0${Colors.Blue} } ${Colors.RESET}
    \n${Colors.Green}${'―'.repeat(50)}
    `);
}

class RandomUserAgent {
  static userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Edge/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Edge/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Edge/120.0.0.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 OPR/114.0.0.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 AtContent/95.5.5462.5"
  ];

  static getRandomUserAgent() {
    if (!this.userAgents || this.userAgents.length === 0) {
      throw new Error("User agents array is empty or undefined");
    }
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }
}

class ProxyError extends Error {
  constructor(message, proxy) {
    super(message);
    this.proxy = proxy;
    this.name = "ProxyError";
  }
}

async function getProxyAgent(proxy) {
  if (!proxy) {
    throw new ProxyError("Proxy URL is required", proxy);
  }
  try {
    if (proxy.startsWith("http://") || proxy.startsWith("https://")) {
      return new HttpsProxyAgent(proxy);
    }
    if (proxy.startsWith("socks://") || proxy.startsWith("socks5://")) {
      return new SocksProxyAgent(proxy);
    }
    throw new ProxyError(`Unsupported proxy protocol: ${proxy}`, proxy);
  } catch (error) {
    if (error instanceof ProxyError) {
      throw error;
    }
    throw new ProxyError(`Failed to create proxy agent: ${error.message}`, proxy);
  }
}

// Utility function to load accounts from data.txt and proxies from proxy.txt,
// then map each account token to its corresponding proxy (based on index).
async function loadAccountsAndProxies() {
  try {
    const dataContent = await fs.readFile("data.txt", "utf8");
    const tokens = dataContent
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
    let proxies = [];
    try {
      const proxyContent = await fs.readFile("proxy.txt", "utf8");
      proxies = proxyContent
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);
    } catch (err) {
      console.log(`${Colors.Magenta}[INFO]${Colors.RESET} Could not read proxy file (proxy.txt), using local network for all accounts.`);
    }
    return tokens.map((token, index) => {
      return { Token: token, Proxy: proxies[index] || null };
    });
  } catch (err) {
    console.error(`${Colors.Red}[ERROR]${Colors.RESET} Failed to read data file (data.txt): ${err.message}`);
    process.exit(1);
  }
}

// Masks an email address (only first and last characters of username remain visible)
const maskEmail = (email) => {
  const [username, domain] = email.split('@');
  if (username.length <= 2) {
    return email;
  }
  const maskedUsername = username.charAt(0) + "*".repeat(username.length - 2) + username.charAt(username.length - 1);
  return `${maskedUsername}@${domain}`;
};

async function getProxyIP(proxyAgent) {
  try {
    const response = await axios.get("https://api.bigdatacloud.net/data/client-ip", {
      httpsAgent: proxyAgent,
      proxy: false,
      timeout: 10000
    });
    return response.data.ipString;
  } catch (error) {
    return "Unknown";
  }
}

class APIClient {
  constructor(token, proxyAgent = null) {
    this.apiBaseUrl = "https://nodego.ai/api";
    this.bearerToken = token;
    this.proxyAgent = proxyAgent;
  }

  async makeRequest(method, endpoint, data = null) {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const config = {
      method,
      url,
      headers: {
        "Authorization": `Bearer ${this.bearerToken}`,
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      timeout: 60000,
      proxy: false
    };

    if (data) {
      config.data = data;
    }
    if (this.proxyAgent) {
      config.httpsAgent = this.proxyAgent;
    }

    try {
      return await axios(config);
    } catch (error) {
      throw error;
    }
  }

  async getUserInfo() {
    try {
      const response = await this.makeRequest("GET", "/user/me");
      const metadata = response.data.metadata;
      return {
        username: metadata.username,
        email: metadata.email,
        totalPoint: metadata.rewardPoint,
        todayPoint: metadata.todayPoint || 0,
        socialTasks: metadata.socialTask || [],
        nodes: Array.isArray(metadata.nodes)
          ? metadata.nodes.map(node => ({
              id: node.id,
              totalPoint: node.totalPoint,
              todayPoint: node.todayPoint,
              isActive: node.isActive
            }))
          : []
      };
    } catch (error) {
      throw error;
    }
  }

  async dailyCheckin() {
    try {
      const response = await this.makeRequest("POST", "/user/checkin");
      return {
        statusCode: response.data.statusCode,
        message: response.data.message,
        userData: response.data.metadata.user
      };
    } catch (error) {
      const statusCode = error.response?.data?.statusCode || error.response?.status || 500;
      const message = error.response?.data?.message || error.message;
      throw { statusCode, message, error: true };
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function pingNode(accessToken, proxyAgent = null) {
  const SERVER_URL = "https://nodego.ai/api/user/nodes/ping";
  const config = {
    method: "POST",
    url: SERVER_URL,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "Authorization": `Bearer ${accessToken}`,
      "Origin": "chrome-extension://jbmdcnidiaknboflpljihfnbonjgegah",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-Storage-Access": "active",
      "User-Agent": RandomUserAgent.getRandomUserAgent()
    },
    timeout: 30000,
    proxy: false,
    data: { type: "extension" }
  };
  if (proxyAgent) {
    config.httpsAgent = proxyAgent;
  }
  try {
    const response = await axios(config);
    if (response.status >= 200 && response.status < 300) {
      return { success: true, status: response.status };
    } else {
      throw new Error(`Ping failed with status: ${response.status}`);
    }
  } catch (error) {
    const statusCode = error.response?.data?.statusCode || error.response?.status || 0;
    if (statusCode === 429) {
      console.log("Ping ignored due to duplicate prevention (429), retrying ping in 2 minutes...");
    } else {
      console.error(`${Colors.Red}[PING ERROR]${Colors.RESET} ${error.message}`);
      console.log("Retrying ping in 2 minutes...");
    }
    await delay(120000);
    return await pingNode(accessToken, proxyAgent);
  }
}

async function pingCycleForAccount(accountDetail) {
  // If a proxy agent was successfully loaded, use it; otherwise, default to local network.
  const agentsToUse = (accountDetail.proxyAgents && accountDetail.proxyAgents.length > 0)
    ? accountDetail.proxyAgents
    : [null];

  for (const proxyObj of agentsToUse) {
    const agent = proxyObj ? proxyObj.agent : null;
    let proxyIP;
    if (agent) {
      proxyIP = await getProxyIP(agent);
    } else {
      proxyIP = "Local network";
    }
    try {
      await pingNode(accountDetail.token, agent);
      logShortUpdate(accountDetail.masked, "Success", "", proxyIP);
    } catch (error) {
      logShortUpdate(accountDetail.masked, "Failed", error.response?.status || error.message, proxyIP);
    }
    await delay(1000);
  }
}

function logFullUpdate(maskedEmail, todayPoint, totalPoint, totalActiveNodes, totalProxylist, pingStatus, errCode = "") {
  const statusColor = (pingStatus === "Success") ? Colors.Green : Colors.Red;
  console.log(`\n${Colors.Dim}${Colors.RESET}${'―'.repeat(50)}`);
  console.log(
    `${Colors.Gold}]>${Colors.RESET} Account ${Colors.Teal}${maskedEmail}
${Colors.Teal}[+]${Colors.RESET} point today : ${todayPoint}${Colors.RESET}
${Colors.Teal}[+]${Colors.RESET} points total: ${totalPoint}${Colors.RESET}
${Colors.Teal}[+]${Colors.RESET} Total nodes : ${Colors.Gold}${totalActiveNodes}${Colors.RESET}
${Colors.Teal}[+]${Colors.RESET} Total Proxy : ${Colors.Gold}${totalProxylist}${Colors.RESET}
${Colors.Teal}[+]${Colors.RESET} status ping : ${statusColor}${pingStatus}${(errCode ? " (" + errCode + ")" : "")}${Colors.RESET}`
  );
  console.log(`${Colors.Dim}${Colors.RESET}${'―'.repeat(50)}`);
}

function logShortUpdate(maskedEmail, pingStatus, errCode = "", proxyIP = "") {
  const statusColor = (pingStatus === "Success" || pingStatus === "Checkin Success") ? Colors.Green : Colors.Red;
  console.log(
    `${Colors.Gold}]>${Colors.RESET} ${maskedEmail} | ProxyIP: ${Colors.Neon}${proxyIP}${Colors.RESET} | status: ${statusColor}${pingStatus}${(errCode ? " (" + errCode + ")" : "")}${Colors.RESET}`
  );
}

async function runPinger() {
  const accountDetails = [];

  for (const acc of accountLists) {
    let proxyAgents = [];
    if (acc.Proxy) {
      try {
        const agent = await getProxyAgent(acc.Proxy);
        proxyAgents.push({ agent, proxy: acc.Proxy });
      } catch (err) {
        console.error(`${Colors.Magenta}[INFO]${Colors.RESET} Skipping invalid proxy for account with token ${acc.Token}: ${err.message}`);
      }
    }

    let userInfo;
    if (proxyAgents.length > 0) {
      try {
        userInfo = await Promise.any(
          proxyAgents.map(proxyObj => new APIClient(acc.Token, proxyObj.agent).getUserInfo())
        );
      } catch (err) {
        try {
          userInfo = await new APIClient(acc.Token, null).getUserInfo();
        } catch (error) {
          console.error(`Error fetching user info for account with token ${acc.Token}: ${error.message}`);
          continue;
        }
      }
    } else {
      try {
        userInfo = await new APIClient(acc.Token, null).getUserInfo();
      } catch (error) {
        console.error(`Error fetching user info for account with token ${acc.Token}: ${error.message}`);
        continue;
      }
    }

    const masked = maskEmail(userInfo.email);
    const activeNodes = userInfo.nodes.filter(node => node.isActive);
    const totalTodayPoint = activeNodes.reduce((sum, node) => sum + node.todayPoint, 0);
    const totalNodeActive = activeNodes.length;
    logFullUpdate(masked, totalTodayPoint, userInfo.totalPoint, totalNodeActive, proxyAgents.length, "Pending");

    accountDetails.push({
      token: acc.Token,
      proxyAgents,
      masked,
      initialInfo: userInfo
    });
  }

  for (const accDetail of accountDetails) {
    pingCycleForAccount(accDetail);
    setInterval(() => {
      pingCycleForAccount(accDetail);
    }, 120000);
    setInterval(async () => {
      let updatedInfo;
      if (accDetail.proxyAgents && accDetail.proxyAgents.length > 0) {
        try {
          updatedInfo = await Promise.any(
            accDetail.proxyAgents.map(proxyObj => new APIClient(accDetail.token, proxyObj.agent).getUserInfo())
          );
        } catch (err) {
          try {
            updatedInfo = await new APIClient(accDetail.token, null).getUserInfo();
          } catch (error) {
            logFullUpdate(
              accDetail.masked,
              accDetail.initialInfo.todayPoint,
              accDetail.initialInfo.totalPoint,
              accDetail.initialInfo.nodes.filter(n => n.isActive).length,
              (accDetail.proxyAgents ? accDetail.proxyAgents.length : 0),
              "Failed",
              error.response?.status || error.message
            );
            return;
          }
        }
      } else {
        try {
          updatedInfo = await new APIClient(accDetail.token, null).getUserInfo();
        } catch (error) {
          logFullUpdate(
            accDetail.masked,
            accDetail.initialInfo.todayPoint,
            accDetail.initialInfo.totalPoint,
            accDetail.initialInfo.nodes.filter(n => n.isActive).length,
            0,
            "Failed",
            error.response?.status || error.message
          );
          return;
        }
      }
      const activeNodesUpdated = updatedInfo.nodes.filter(node => node.isActive);
      const totalTodayPointUpdated = activeNodesUpdated.reduce((sum, node) => sum + node.todayPoint, 0);
      const totalNodeActiveUpdated = activeNodesUpdated.length;
      logFullUpdate(maskEmail(updatedInfo.email), totalTodayPointUpdated, updatedInfo.totalPoint, totalNodeActiveUpdated, (accDetail.proxyAgents ? accDetail.proxyAgents.length : 0), "Success");
    }, 600000);
  }
}

async function runDailyCheckin() {
  for (const acc of accountLists) {
    let proxyAgents = [];
    if (acc.Proxy) {
      try {
        const agent = await getProxyAgent(acc.Proxy);
        proxyAgents.push({ agent, proxy: acc.Proxy });
      } catch (err) {
        console.error(`${Colors.Magenta}[INFO]${Colors.RESET} Skipping invalid proxy for account with token ${acc.Token}: ${err.message}`);
      }
    }
    const randomAgent = (proxyAgents.length > 0)
      ? proxyAgents[Math.floor(Math.random() * proxyAgents.length)].agent
      : null;
    const client = new APIClient(acc.Token, randomAgent);
    let userInfo;
    try {
      userInfo = await client.getUserInfo();
    } catch (error) {
      console.error(`Error fetching user info for token ${acc.Token}: ${error.message}`);
      continue;
    }
    const masked = maskEmail(userInfo.email);
    let result = null;
    while (true) {
      try {
        result = await client.dailyCheckin();
        break;
      } catch (error) {
        if (error.statusCode === 429) {
          console.log(`${Colors.Blue}[DAILY CHECKIN RETRY]${Colors.RESET} ${masked} encountered error 429, retrying in 15 seconds...`);
          await delay(15000);
          continue;
        } else if (error.statusCode === 400 && error.message.includes("once per day")) {
          console.log(`${Colors.Blue}[DAILY CHECKIN]${Colors.RESET} ${masked} already checked in today.`);
          logShortUpdate(masked, "Request Success");
          result = null;
          break;
        } else {
          logShortUpdate(masked, "Failed", error.statusCode || error.message);
          result = null;
          break;
        }
      }
    }
    if (result) {
      if (result.statusCode >= 200 && result.statusCode < 300) {
        logShortUpdate(masked, "Checkin Success");
      } else {
        const activeNodes = userInfo.nodes.filter(node => node.isActive);
        const totalTodayPoint = activeNodes.reduce((sum, node) => sum + node.todayPoint, 0);
        const totalNodeActive = activeNodes.length;
        const newTotal = result.userData?.rewardPoint || userInfo.totalPoint;
        logFullUpdate(masked, totalTodayPoint, newTotal, totalNodeActive, proxyAgents.length, "Success");
      }
    }
  }
}

function displayMenu() {
  console.log(`
${Colors.Blue}Menu:${Colors.RESET}

${Colors.Gold}1. ${Colors.RESET}Run Pinger
${Colors.Gold}2. ${Colors.RESET}Daily Checkin
${Colors.Gold}3. ${Colors.Red}Exit${Colors.RESET}
`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Select option (1, 2 or 3): ", async (answer) => {
    if (answer.trim() === "1") {
      console.clear();
      console.log(`\n${Colors.Dim}${Colors.RESET}${'―'.repeat(50)}`);
      console.log(`${Colors.Teal}Starting pinger cycles...${Colors.RESET}`);
      console.log(`${Colors.Dim}${Colors.RESET}${'―'.repeat(50)}\n`);
      await runPinger();
    } else if (answer.trim() === "2") {
      console.clear();
      console.log(`\n${Colors.Dim}${Colors.RESET}${'―'.repeat(50)}`);
      console.log(`${Colors.Gold}Performing daily checkin for all accounts...${Colors.RESET}`);
      console.log(`${Colors.Dim}${Colors.RESET}${'―'.repeat(50)}\n`);
      await runDailyCheckin();
      rl.close();
      await displayMenu();
    } else if (answer.trim() === "3") {
      console.log(`${Colors.Red}Exiting the application. Goodbye!${Colors.RESET}`);
      rl.close();
      process.exit(0);
    } else {
      console.log(`${Colors.Red}Invalid option. Please try again.${Colors.RESET}`);
      rl.close();
      await displayMenu();
    }
  });
}

async function main() {
  console.clear();
  CoderMark();
  // Load accounts and proxy mappings from data.txt and proxy.txt
  accountLists = await loadAccountsAndProxies();
  displayMenu();
}

main();

process.on("SIGINT", () => {
  console.log(`\n${Colors.Red}Gracefully shutting down.${Colors.RESET}`);
  process.exit(0);
});
