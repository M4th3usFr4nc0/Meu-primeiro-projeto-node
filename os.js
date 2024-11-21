const os = require('os');

// Plataforma do sistema operacional
const plataforma = os.platform();
console.log(`Plataforma: ${plataforma}`); // Ex: 'darwin' (macOS), 'win32' (Windows), 'linux'
// Arquitetura da CPU
const arquitetura = os.arch();
console.log(`Arquitetura da CPU: ${arquitetura}`); // Ex: 'x64', 'arm64'
// Memória RAM total (em bytes)
const memoriaTotal = os.totalmem();
// Memória RAM livre (em bytes)
const memoriaLivre = os.freemem();
// Converter bytes para gigabytes (opcional):
function bytesToGb(bytes) {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
}
console.log(`Memória RAM total: ${bytesToGb(memoriaTotal)}`);
console.log(`Memória RAM livre: ${bytesToGb(memoriaLivre)}`);
// Informações da CPU
const cpus = os.cpus();
console.log('Informações da CPU:');
console.log(cpus);
// Tipo de CPU
console.log(`Tipo de CPU: ${os.type()}`)
// Versão do Kernel
console.log(`Versão do Kernel: ${os.release()}`)
// Tempo de atividade do sistema em segundos
const uptime = os.uptime();
console.log(`Tempo de atividade do sistema: ${uptime} segundos`);
// Maneira mais completa:
function getMacOSVersion() {
    if (os.platform() !== 'darwin') {
      return 'Não é macOS';
    }
  
    const release = os.release().split('.');
    const majorVersion = parseInt(release[0]);
  
    switch (majorVersion) {
        case 22:
            return `Ventura ${os.release()}`;
        case 21:
            return `Monterey ${os.release()}`;
        case 20:
            return `Big Sur ${os.release()}`;
        case 19:
return `Catalina ${os.release()}`;
        case 18:
            return `Mojave ${os.release()}`;
        case 17:
            return `High Sierra ${os.release()}`;
        case 16:
            return `Sierra ${os.release()}`;
        case 15:
            return `El Capitan ${os.release()}`;
        case 14:
            return `Yosemite ${os.release()}`;
        case 13:
            return `Mavericks ${os.release()}`;
      default:
        return `macOS ${os.release()}`; // Versões mais antigas
    }
}


console.log(getMacOSVersion());