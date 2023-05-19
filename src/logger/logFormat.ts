import winston, { format } from 'winston';

const logFormat = format.combine(format.timestamp(), winston.format.printf(({
  level, message, label, timestamp,
}) => {
  const hora = new Date(timestamp).toLocaleString('pt-BR');

  return `[${hora}] [${label}] [${level}]: ${message}`;
}));

export default logFormat;
