export async function channelsResponse(
  phoneNumber: string,
  contactName: string
): Promise<string[]> {
  return [
    `*${contactName}*, segue alguns canais que recomendo você dar uma olhada!`,
    `1. Código Fonte TV: https://www.youtube.com/@codigofontetv \r\n` +
      `2. Mano deyvin: https://www.youtube.com/@manodeyvin \r\n` +
      `3. Rocketseat: https://www.youtube.com/@rocketseat \r\n` +
      `4. Lucas Montano: https://www.youtube.com/@LucasMontano \r\n` +
      `5. Fiasco: https://www.youtube.com/@GrandeFiasco \r\n` +
      `6. Diolinux: https://www.youtube.com/@Diolinux \r\n` +
      `7. Curso em Vídeo: https://www.youtube.com/c/CursoemV%C3%ADdeo \r\n` +
      `8. Sujeito programador: https://www.youtube.com/@Sujeitoprogramador \r\n` +
      `9. Olhar Digital: https://www.youtube.com/@OlharDigital \r\n` +
      `10. Micael Mota: https://www.youtube.com/@devmicaelomota \r\n` +
      `11. Léo Andrade: https://www.youtube.com/@leoandradenet \r\n` +
      `12. Jovem Tranquilão: https://www.youtube.com/c/JovemTranquil%C3%A3o \r\n` +
      `13. Dev Erik: https://www.youtube.com/@deverik \r\n` +
      `14. Bolt: https://www.youtube.com/@boltjz`,
    `Aproveite os conteúdos desses canais e bons estudos 📚!`,
  ];
}
