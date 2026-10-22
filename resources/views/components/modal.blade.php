@props([
    'id',
    'title',
    'size' => 'modal-lg',
])

<div class="modal fade"
     id="{{ $id }}"
     tabindex="-1"
     aria-labelledby="{{ $id }}-title"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable {{ $size }}">
        <div class="modal-content clinic-modal">
            <div class="modal-header">
                <h2 class="modal-title fs-5" id="{{ $id }}-title">
                    {{ $title }}
                </h2>

                <button type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
            </div>

            <div class="modal-body">
                {{ $slot }}
            </div>

            @isset($footer)
                <div class="modal-footer">
                    {{ $footer }}
                </div>
            @endisset
        </div>
    </div>
</div>
