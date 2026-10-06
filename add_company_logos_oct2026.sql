-- Logo coverage, 6 Oct 2026.
-- Founder asked that every role show a company logo. A real-browser audit of the
-- live site found 446 rows with no logo_url plus ~17 companies whose hotlinked
-- logo is blocked by the company site, and ~155 newly added rows. 52 logos were
-- downloaded from each company's own site (or Google's icon service where the
-- site blocks scripts), normalised to PNG and committed to public/logos so they
-- cannot be hotlink-blocked. Companies that already had a working logo on other
-- rows had it copied to their empty rows.
-- Already applied directly to production via the Supabase admin client - this
-- file is kept for the repo's audit trail.

-- Self-hosted logos (replace any existing logo for the company)
update public.opportunities set logo_url = '/logos/news-uk.png' where company = 'News UK' and logo_url is distinct from '/logos/news-uk.png';  -- 4 rows
update public.opportunities set logo_url = '/logos/mills-and-reeve.png' where company = 'Mills & Reeve' and logo_url is distinct from '/logos/mills-and-reeve.png';  -- 8 rows
update public.opportunities set logo_url = '/logos/arena-investors-lp.png' where company = 'Arena Investors, LP' and logo_url is distinct from '/logos/arena-investors-lp.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/wincent.png' where company = 'Wincent' and logo_url is distinct from '/logos/wincent.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/moelis-and-company.png' where company = 'Moelis & Company' and logo_url is distinct from '/logos/moelis-and-company.png';  -- 11 rows
update public.opportunities set logo_url = '/logos/brg.png' where company = 'BRG' and logo_url is distinct from '/logos/brg.png';  -- 9 rows
update public.opportunities set logo_url = '/logos/eastdil-secured.png' where company = 'Eastdil Secured' and logo_url is distinct from '/logos/eastdil-secured.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/reed-smith.png' where company = 'Reed Smith' and logo_url is distinct from '/logos/reed-smith.png';  -- 5 rows
update public.opportunities set logo_url = '/logos/tower-peak-partners.png' where company = 'Tower Peak Partners' and logo_url is distinct from '/logos/tower-peak-partners.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/howden.png' where company = 'Howden' and logo_url is distinct from '/logos/howden.png';  -- 20 rows
update public.opportunities set logo_url = '/logos/amey.png' where company = 'Amey' and logo_url is distinct from '/logos/amey.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/augusta-and-co.png' where company = 'Augusta & Co' and logo_url is distinct from '/logos/augusta-and-co.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/barnett-waddingham.png' where company = 'Barnett Waddingham' and logo_url is distinct from '/logos/barnett-waddingham.png';  -- 19 rows
update public.opportunities set logo_url = '/logos/chicago-trading-company.png' where company = 'Chicago Trading Company' and logo_url is distinct from '/logos/chicago-trading-company.png';  -- 2 rows
update public.opportunities set logo_url = '/logos/graham-capital-management.png' where company = 'Graham Capital Management' and logo_url is distinct from '/logos/graham-capital-management.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/harrison-street.png' where company = 'Harrison Street' and logo_url is distinct from '/logos/harrison-street.png';  -- 2 rows
update public.opportunities set logo_url = '/logos/mustard-systems.png' where company = 'Mustard Systems' and logo_url is distinct from '/logos/mustard-systems.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/qube-rt.png' where company = 'Qube RT' and logo_url is distinct from '/logos/qube-rt.png';  -- 6 rows
update public.opportunities set logo_url = '/logos/menzies-llp.png' where company = 'Menzies LLP' and logo_url is distinct from '/logos/menzies-llp.png';  -- 42 rows
update public.opportunities set logo_url = '/logos/zaoui-and-co.png' where company = 'Zaoui & Co' and logo_url is distinct from '/logos/zaoui-and-co.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/isio.png' where company = 'Isio' and logo_url is distinct from '/logos/isio.png';  -- 33 rows
update public.opportunities set logo_url = '/logos/hymans-robertson.png' where company = 'Hymans Robertson' and logo_url is distinct from '/logos/hymans-robertson.png';  -- 4 rows
update public.opportunities set logo_url = '/logos/baringa.png' where company = 'Baringa' and logo_url is distinct from '/logos/baringa.png';  -- 5 rows
update public.opportunities set logo_url = '/logos/cgi.png' where company = 'CGI' and logo_url is distinct from '/logos/cgi.png';  -- 14 rows
update public.opportunities set logo_url = '/logos/capgemini.png' where company = 'Capgemini Invent' and logo_url is distinct from '/logos/capgemini.png';  -- 9 rows
update public.opportunities set logo_url = '/logos/capgemini.png' where company = 'Capgemini' and logo_url is distinct from '/logos/capgemini.png';  -- 10 rows
update public.opportunities set logo_url = '/logos/charles-russell-speechlys.png' where company = 'Charles Russell Speechlys' and logo_url is distinct from '/logos/charles-russell-speechlys.png';  -- 4 rows
update public.opportunities set logo_url = '/logos/squire-patton-boggs.png' where company = 'Squire Patton Boggs' and logo_url is distinct from '/logos/squire-patton-boggs.png';  -- 9 rows
update public.opportunities set logo_url = '/logos/td-securities.png' where company = 'TD Securities' and logo_url is distinct from '/logos/td-securities.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/standard-bank-group.png' where company = 'Standard Bank Group' and logo_url is distinct from '/logos/standard-bank-group.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/bird-and-bird.png' where company = 'Bird & Bird' and logo_url is distinct from '/logos/bird-and-bird.png';  -- 10 rows
update public.opportunities set logo_url = '/logos/cms.png' where company = 'CMS' and logo_url is distinct from '/logos/cms.png';  -- 3 rows
update public.opportunities set logo_url = '/logos/debevoise-and-plimpton.png' where company = 'Debevoise & Plimpton' and logo_url is distinct from '/logos/debevoise-and-plimpton.png';  -- 2 rows
update public.opportunities set logo_url = '/logos/dla-piper.png' where company = 'DLA Piper' and logo_url is distinct from '/logos/dla-piper.png';  -- 10 rows
update public.opportunities set logo_url = '/logos/fieldfisher.png' where company = 'Fieldfisher' and logo_url is distinct from '/logos/fieldfisher.png';  -- 3 rows
update public.opportunities set logo_url = '/logos/jones-day.png' where company = 'Jones Day' and logo_url is distinct from '/logos/jones-day.png';  -- 3 rows
update public.opportunities set logo_url = '/logos/katten-muchin-rosenman.png' where company = 'Katten Muchin Rosenman' and logo_url is distinct from '/logos/katten-muchin-rosenman.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/macfarlanes.png' where company = 'Macfarlanes' and logo_url is distinct from '/logos/macfarlanes.png';  -- 3 rows
update public.opportunities set logo_url = '/logos/mayer-brown.png' where company = 'Mayer Brown' and logo_url is distinct from '/logos/mayer-brown.png';  -- 5 rows
update public.opportunities set logo_url = '/logos/paul-hastings.png' where company = 'Paul Hastings' and logo_url is distinct from '/logos/paul-hastings.png';  -- 4 rows
update public.opportunities set logo_url = '/logos/rpc.png' where company = 'RPC' and logo_url is distinct from '/logos/rpc.png';  -- 4 rows
update public.opportunities set logo_url = '/logos/russell-cooke.png' where company = 'Russell-Cooke' and logo_url is distinct from '/logos/russell-cooke.png';  -- 2 rows
update public.opportunities set logo_url = '/logos/simpson-thacher-and-bartlett.png' where company = 'Simpson Thacher & Bartlett' and logo_url is distinct from '/logos/simpson-thacher-and-bartlett.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/skadden.png' where company = 'Skadden' and logo_url is distinct from '/logos/skadden.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/capstone-investment-advisors.png' where company = 'Capstone Investment Advisors' and logo_url is distinct from '/logos/capstone-investment-advisors.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/rbc-capital-markets.png' where company = 'RBC Capital Markets' and logo_url is distinct from '/logos/rbc-capital-markets.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/hannover-re.png' where company = 'Hannover Re' and logo_url is distinct from '/logos/hannover-re.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/steen-associates.png' where company = 'Steen Associates' and logo_url is distinct from '/logos/steen-associates.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/multiplex.png' where company = 'Multiplex' and logo_url is distinct from '/logos/multiplex.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/lidl-gb.png' where company = 'Lidl GB' and logo_url is distinct from '/logos/lidl-gb.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/liberty-global.png' where company = 'Liberty Global' and logo_url is distinct from '/logos/liberty-global.png';  -- 2 rows
update public.opportunities set logo_url = '/logos/baker-hughes.png' where company = 'Baker Hughes' and logo_url is distinct from '/logos/baker-hughes.png';  -- 1 rows
update public.opportunities set logo_url = '/logos/occ.png' where company = 'OCC' and logo_url is distinct from '/logos/occ.png';  -- 1 rows

-- Existing logo reused for rows that had none
update public.opportunities set logo_url = 'https://upload.wikimedia.org/wikipedia/commons/6/69/RSMStandardLogoRGB.png' where company = 'RSM UK' and (logo_url is null or logo_url = '');  -- 75 rows
update public.opportunities set logo_url = 'https://hl.com/favicon.ico' where company = 'Houlihan Lokey' and (logo_url is null or logo_url = '');  -- 6 rows
update public.opportunities set logo_url = 'https://www.citigroup.com/global/citigroup-ui/akpublic/images/gpa_favicon.ico' where company = 'Citi' and (logo_url is null or logo_url = '');  -- 91 rows
update public.opportunities set logo_url = 'https://www.rothschildandco.com/static/favicons/apple-touch-icon-180.png?v=2.1.0.30540' where company = 'Rothschild & Co' and (logo_url is null or logo_url = '');  -- 5 rows
update public.opportunities set logo_url = 'https://www.google.com/s2/favicons?domain=mlp.com&sz=128' where company = 'Millennium Management' and (logo_url is null or logo_url = '');  -- 1 rows
update public.opportunities set logo_url = 'https://attraxcdnprod1-freshed3dgayb7c3.z01.azurefd.net/1481212/bf10964d-3108-4a11-a60e-0374d019fd96/2026.3.4.20637/Blob/favicon.ico' where company = 'EDF Energy' and (logo_url is null or logo_url = '');  -- 25 rows
update public.opportunities set logo_url = 'https://static-assets.monzo.com/monzo-com/a0e2d265d520a8340bc3e5250a208b6a3241e736/_next/static/media/favicon.87a9df8c.png' where company = 'Monzo' and (logo_url is null or logo_url = '');  -- 1 rows
update public.opportunities set logo_url = 'https://cdn-group.bnpparibas.com/favicon.ico' where company = 'BNP Paribas' and (logo_url is null or logo_url = '');  -- 17 rows
update public.opportunities set logo_url = 'https://www.lek.com/themes/custom/lekdaisy/favicons/apple-touch-icon.png' where company = 'L.E.K. Consulting' and (logo_url is null or logo_url = '');  -- 8 rows
update public.opportunities set logo_url = 'https://prod2.master.dwebcms.db.com/application/themes/default/favicon/favicon-32x32.png' where company = 'Deutsche Bank' and (logo_url is null or logo_url = '');  -- 14 rows
update public.opportunities set logo_url = 'https://assets.revolut.com/assets/favicons/apple-touch-icon.png' where company = 'Revolut' and (logo_url is null or logo_url = '');  -- 20 rows
update public.opportunities set logo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/National_Health_Service_%28England%29_logo.svg/250px-National_Health_Service_%28England%29_logo.svg.png' where company = 'NHS - Steeper Group' and (logo_url is null or logo_url = '');  -- 1 rows
update public.opportunities set logo_url = 'https://www.oliverwyman.com/content/dam/oliver-wyman/v3/logos/favicon-marsh-sky-blue-48px.svg' where company = 'Oliver Wyman' and (logo_url is null or logo_url = '');  -- 25 rows
update public.opportunities set logo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/National_Health_Service_%28England%29_logo.svg/250px-National_Health_Service_%28England%29_logo.svg.png' where company = 'NHS Wales Shared Services Partnership' and (logo_url is null or logo_url = '');  -- 1 rows
update public.opportunities set logo_url = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Standard_Chartered_%282021%29.svg' where company = 'Standard Chartered' and (logo_url is null or logo_url = '');  -- 10 rows
update public.opportunities set logo_url = 'https://www.lazard.com/dist/images/fav/apple-touch-icon.png' where company = 'Lazard' and (logo_url is null or logo_url = '');  -- 5 rows
update public.opportunities set logo_url = 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Grant_Thornton_logo.png' where company = 'Grant Thornton' and (logo_url is null or logo_url = '');  -- 112 rows
update public.opportunities set logo_url = 'https://www.bny.com/content/dam/bnymellon/web/favicons/favicon-128.png' where company = 'BNY Mellon' and (logo_url is null or logo_url = '');  -- 18 rows
update public.opportunities set logo_url = 'https://tbcdn.talentbrew.com/company/34155/gst_v1/img/unilever-favicon-799.png' where company = 'Unilever' and (logo_url is null or logo_url = '');  -- 1 rows
update public.opportunities set logo_url = 'https://www.kpmgcareers.co.uk/favicon.ico' where company = 'KPMG' and (logo_url is null or logo_url = '');  -- 1 rows
