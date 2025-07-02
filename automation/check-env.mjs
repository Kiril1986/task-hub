import { readFileSync, existsSync } from 'fs';

function parseEnv(path) {
    return readFileSync(path, 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
        .map(line => line.split('=')[0].trim());
}

function check() {
    const examplePath = '.env.example';
    const envPath = '.env';

    if (!existsSync(examplePath)) {
        console.error(`Missing ${examplePath}`);
        process.exit(1);
    }

    if (!existsSync(envPath)) {
        console.error(`Missing ${envPath}. Copy ${examplePath} and fill it.`);
        process.exit(1);
    }

    const exampleKeys = parseEnv(examplePath);
    const envKeys = parseEnv(envPath);

    const missing = exampleKeys.filter(k => !envKeys.includes(k));
    const extra = envKeys.filter(k => !exampleKeys.includes(k));

    if (missing.length || extra.length) {
        console.error('Environment variable mismatch detected.');
        if (missing.length) console.error(`Missing in .env: ${missing.join(', ')}`);
        if (extra.length) console.error(`Extra in .env: ${extra.join(', ')}`);
        process.exit(1);
    }
}

check();
