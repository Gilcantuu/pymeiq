@"
# /dashboard route

Reads the last 5 saved diagnostics from Supabase core_outputs ordered by created_at desc. Empty state directs the user to /core to create their first diagnostic.
"@ | Set-Content -Path "app\dashboard\README.md" -Encoding utf8