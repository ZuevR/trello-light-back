module.exports = {
  layout(userId, token) {
    return `<td align="left" valign="top" style="background:#f0f0f0;font:15px 'helvetica neue' , 'arial' , 'helvetica'">
  <table style="border:none;margin:50px auto 50px auto;padding:0 18px 0 18px;width:500px">
    <tbody>
    <tr height="57">
      <td align="left" valign="top"
          style="background:#0079bf;border-top-left-radius:4px;border-top-right-radius:4px;padding:12px 18px 12px 18px;text-align:center">

        <img height="37" title="Trello" width="122"
             style="color:#fff;font-size:18px;font-weight:bold;vertical-align:top"
             src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Ftrello.com%2Fimages%2Femail-header-logo-white-v2.png&amp;proxy=yes&amp;key=425eaf058e1cd62cfb83a85b464acb4e">
      </td>
    </tr>
    <tr>
      <td align="left" valign="top"
          style="background:#fff;border-bottom-left-radius:4px;border-bottom-right-radius:4px;padding:18px"><h1
        style="color:#333;font-size:20px;margin:0;text-align:center"> We are glad that you are here! </h1>

        <p style="color:#333;font:15px / 1.25em 'helvetica neue' , 'arial' , 'helvetica'">

          <a
            href="http://localhost:3000/api/v1/auth/confirm?confirmationToken=${ token }&amp;userId=${ userId }"
            style="background:#3aa54c;border-radius:3px;color:#fff;display:block;font-size:16px;font-weight:700;line-height:1.25em;margin:24px auto 24px auto;padding:10px 18px 10px 18px;text-align:center;text-decoration:none;width:220px"
            data-vdir-href="https://mail.yandex.ru/re.jsx?uid=237374884&amp;c=LIZA&amp;cv=17.9.107&amp;mid=170010885933249341&amp;h=a,krI_NC6Jr-YtLWhwAQSdUw&amp;l=aHR0cHM6Ly90cmVsbG8uY29tL2NvbmZpcm0_Y29uZmlybWF0aW9uVG9rZW49NzZiN2Q0MTFjYTU5N2FmYWYyN2JlYzVmMGZhZjhiZDMmaWRNZW1iZXI9NWI5NDAzZGIwNjJiNWIwODQyZWQ0NmU3JnJldHVyblVybD0lMkY"
            data-orig-href="https://trello.com/confirm?confirmationToken=76b7d411ca597afaf27bec5f0faf8bd3&amp;idMember=5b9403db062b5b0842ed46e7&amp;returnUrl=%2F"
            class="daria-goto-anchor" target="_blank" rel="noopener noreferrer">Confirm your email address
          </a>

        </p>
        <p
          style="color:#939393;font:15px / 1.25em 'helvetica neue' , 'arial' , 'helvetica';margin-bottom:0;text-align:center">
          We just want to confirm that you are you. </p>
        <p
          style="color:#939393;font:15px / 1.25em 'helvetica neue' , 'arial' , 'helvetica';margin-bottom:0;text-align:center">
          If you have not created a Trello account, simply delete this letter and everything will remain as it is. </p>

      </td>
    </tr>
    </tbody>
  </table>
</td>`;
  }
};
