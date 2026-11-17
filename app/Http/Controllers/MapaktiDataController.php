<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MapaktiDataController extends Controller
{
    /**
     * Memastikan database terisi default seed data jika masih kosong
     */
    public function ensureSeeded(): void
    {
        if (DB::table('mapakti_collections')->count() === 0) {
            $seedFile = database_path('seedData.json');
            if (file_exists($seedFile)) {
                $seed = json_decode(file_get_contents($seedFile), true);
                if (is_array($seed)) {
                    $now = now();
                    $insertData = [];
                    foreach ($seed as $key => $data) {
                        $insertData[] = [
                            'collection_key' => $key,
                            'data_json'      => json_encode($data, JSON_UNESCAPED_UNICODE),
                            'created_at'     => $now,
                            'updated_at'     => $now,
                        ];
                    }
                    if (!empty($insertData)) {
                        DB::table('mapakti_collections')->insert($insertData);
                    }
                }
            }
        }
    }

    /**
     * Render SPA view welcome dengan data terkini diinject langsung
     */
    public function welcome()
    {
        $this->ensureSeeded();

        $rows = DB::table('mapakti_collections')->get();
        $allData = [];
        foreach ($rows as $row) {
            $allData[$row->collection_key] = json_decode($row->data_json, true);
        }

        return view('welcome', [
            'initialData' => $allData
        ]);
    }

    /**
     * GET /api/data — ambil semua koleksi atau satu koleksi berdasarkan ?key=
     */
    public function index(Request $request)
    {
        $this->ensureSeeded();

        $key = $request->query('key');

        if ($key) {
            $row = DB::table('mapakti_collections')
                ->where('collection_key', $key)
                ->first();

            if (!$row) {
                return response()->json(['ok' => false, 'message' => "Key {$key} not found"], 404);
            }

            return response()->json([
                'ok'        => true,
                'key'       => $key,
                'data'      => json_decode($row->data_json, true),
                'updatedAt' => $row->updated_at,
            ]);
        }

        // Semua koleksi
        $rows = DB::table('mapakti_collections')->get();
        $allData = [];
        foreach ($rows as $row) {
            $allData[$row->collection_key] = json_decode($row->data_json, true);
        }

        return response()->json([
            'ok'    => true,
            'data'  => $allData,
            'count' => $rows->count(),
        ]);
    }

    /**
     * POST /api/data — simpan/perbarui satu atau beberapa koleksi
     */
    public function store(Request $request)
    {
        $body = $request->all();

        $key     = $body['key']     ?? null;
        $data    = $body['data']    ?? null;
        $updates = $body['updates'] ?? null;

        if ($key !== null && $data !== null) {
            $this->upsert($key, $data);
            return response()->json(['ok' => true, 'message' => "Collection {$key} saved"]);
        }

        if (is_array($updates)) {
            foreach ($updates as $k => $v) {
                $this->upsert($k, $v);
            }
            return response()->json(['ok' => true, 'message' => 'All updates saved']);
        }

        return response()->json(['ok' => false, 'message' => 'Invalid payload: key & data or updates required'], 400);
    }

    // -------------------------------------------------------
    private function upsert(string $key, mixed $data): void
    {
        $json = json_encode($data, JSON_UNESCAPED_UNICODE);

        DB::table('mapakti_collections')->upsert(
            [
                'collection_key' => $key,
                'data_json'      => $json,
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            ['collection_key'],          // unique key
            ['data_json', 'updated_at'], // kolom yang diperbarui
        );
    }
}
